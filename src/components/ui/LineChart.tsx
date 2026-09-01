import { createEffect, onCleanup, onSettled } from 'solid-js';
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Filler,
  Tooltip,
} from 'chart.js';
import type { ChartOptions, ChartDataset, TooltipModel } from 'chart.js';
import type { ScriptableContext } from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, LineController, Filler, Tooltip);

// Resolve a daisyUI theme variable to a concrete color. The Canvas 2D API does
// not understand `var(--color-primary)` inside strokeStyle/fillStyle, so we read
// the computed value from the root element and use that.
function resolveColor(variable: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
}

// Same color with an alpha suffix for a translucent area fill — the alpha goes
// inside the parens (e.g. `oklch(52% 0.22 262 / 25%)`), which is the only form
// the CSS color parser (and CanvasGradient) accepts.
function withAlpha(color: string, alpha: string): string {
  return color.replace(/\)$/, ` / ${alpha})`);
}

// Vertical gradient under the line: a soft primary wash fading to transparent.
function gradientFill(primary: string) {
  return (ctx: ScriptableContext<'line'>) => {
    const area = ctx.chart.chartArea;
    if (!area) return primary;
    const gradient = ctx.chart.ctx.createLinearGradient(0, area.top, 0, area.bottom);
    gradient.addColorStop(0, withAlpha(primary, '25%'));
    gradient.addColorStop(1, withAlpha(primary, '0%'));
    return gradient;
  };
}

// daisyUI-styled floating tooltip. Styled inline so the theme colors always
// resolve (Tailwind only generates classes it sees in source, not runtime HTML).
function themeTooltip() {
  return {
    handler(context: { chart: Chart; tooltip: TooltipModel<'line'> }) {
      const { chart, tooltip } = context;
      const container = chart.canvas.parentNode as HTMLElement;
      if (!container) return;

      let el = (chart as unknown as { tooltipEl?: HTMLDivElement }).tooltipEl;
      if (!el) {
        el = document.createElement('div');
        el.style.cssText = [
          'position:absolute',
          'pointer-events:none',
          'opacity:0',
          'transition:opacity 0.15s ease',
          'z-index:999',
          'font-size:0.75rem',
          'line-height:1.25rem',
          `background-color:${resolveColor('--color-neutral')}`,
          `color:${resolveColor('--color-neutral-content')}`,
          `border-radius:${resolveColor('--radius-box')}`,
          'box-shadow:0 10px 15px -3px rgb(0 0 0 / 0.15)',
          'padding:0.5rem 0.75rem',
          'white-space:nowrap',
        ].join(';');
        container.style.position = 'relative';
        container.appendChild(el);
        (chart as unknown as { tooltipEl?: HTMLDivElement }).tooltipEl = el;
      }

      if (tooltip.opacity === 0) {
        el.style.opacity = '0';
        return;
      }

      const item = tooltip.dataPoints[0];
      const label = tooltip.title?.[0] ?? '';
      const value = item?.parsed.y ?? 0;
      el.innerHTML = `
        <div style="font-weight:600">${label}</div>
        <span style="display:inline-flex;align-items:center;gap:0.375rem">
          <span style="width:0.5rem;height:0.5rem;border-radius:9999px;background-color:${resolveColor('--color-primary')}"></span>
          $${Number(value).toLocaleString()}
        </span>
      `;

      el.style.left = `${chart.canvas.offsetLeft + tooltip.caretX + 8}px`;
      el.style.top = `${chart.canvas.offsetTop + tooltip.caretY - 8}px`;
      el.style.opacity = '1';
    },
  };
}

const defaultOptions = (): ChartOptions<'line'> => {
  const base300 = resolveColor('--color-base-300');
  const baseContent = resolveColor('--color-base-content');
  const tickColor = withAlpha(baseContent, '40%');
  return {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 400 },
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false, external: themeTooltip().handler },
    },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: { color: tickColor, font: { size: 11 } },
      },
      y: {
        beginAtZero: false,
        border: { display: false },
        grid: { color: base300 },
        ticks: { color: tickColor, font: { size: 11 }, precision: 0 },
      },
    },
  };
};

// Labels + a single revenue series; the chart owns the visual styling.
export type LineChartData = { labels: string[]; values: number[] };
const defaultData: LineChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  values: [42, 48, 45, 61, 58, 72, 78],
};

function makeDataset(primary: string, points: LineChartData): ChartDataset<'line'> {
  return {
    label: 'Revenue',
    data: points.values,
    borderColor: primary,
    borderWidth: 2,
    backgroundColor: gradientFill(primary),
    fill: true,
    tension: 0.4,
    pointRadius: 3,
    pointHoverRadius: 4,
    pointBackgroundColor: primary,
    pointBorderColor: 'transparent',
    pointHoverBorderColor: primary,
    pointBorderWidth: 2,
    pointHoverBorderWidth: 2,
  };
}

type Props = { data?: () => LineChartData; options?: ChartOptions<'line'> };

// daisyUI has no chart component, so this mounts Chart.js (a framework-agnostic
// canvas library) on a <canvas> ref. Chart.js stays browser-only, so it is only
// initialised once the DOM is settled; the instance is destroyed on cleanup.
export function LineChart(props: Props) {
  let ref: HTMLCanvasElement | undefined;
  let chart: Chart | undefined;
  let primary = '';
  let points: LineChartData = defaultData;

  // Reactive primitives must live in the component body, not inside onSettled.
  // On mount this caches the initial points; on later signal changes it swaps
  // the chart's dataset once the (onSettled-created) chart exists.
  createEffect(
    () => props.data?.(),
    (next) => {
      if (!next) return;
      points = next;
      if (!chart) return;
      chart.data = { labels: next.labels, datasets: [makeDataset(primary, next)] };
      chart.update();
    },
  );

  onSettled(() => {
    if (!ref) return;
    primary = resolveColor('--color-primary');

    chart = new Chart(ref, {
      type: 'line',
      data: {
        labels: points.labels,
        datasets: [makeDataset(primary, points)],
      },
      options: props.options ?? defaultOptions(),
    });
  });

  onCleanup(() => {
    chart?.destroy();
    chart = undefined;
  });

  return (
    <div class="relative h-80 w-full">
      <canvas ref={ref} />
    </div>
  );
}

export default LineChart;