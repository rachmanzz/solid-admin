import { onCleanup, onSettled } from 'solid-js';
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Filler,
  Tooltip,
  Legend,
  Colors,
} from 'chart.js';
import type { ChartData, ChartOptions } from 'chart.js';

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Filler,
  Tooltip,
  Legend,
  Colors,
);

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

// Resolve a daisyUI theme variable to a concrete color. The Canvas 2D API does
// not understand `var(--color-primary)` inside strokeStyle/fillStyle, so we read
// the computed value from the root element and use that.
function resolveColor(variable: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
}

// Same color with an alpha suffix for a translucent area fill
// (e.g. `oklch(52% 0.22 262 / 12%)`).
function withAlpha(color: string, alpha: string): string {
  return `${color} / ${alpha}`;
}

function buildData(): ChartData {
  const primary = resolveColor('--color-primary');
  const accent = resolveColor('--color-accent');
  return {
    labels,
    datasets: [
      {
        label: 'Revenue',
        data: [42, 48, 45, 61, 58, 72, 78],
        borderColor: primary,
        backgroundColor: withAlpha(primary, '12%'),
        fill: true,
        tension: 0.3,
        pointRadius: 3,
      },
      {
        label: 'Sales',
        data: [30, 35, 33, 44, 47, 55, 60],
        borderColor: accent,
        backgroundColor: withAlpha(accent, '12%'),
        fill: true,
        tension: 0.3,
        pointRadius: 3,
      },
    ],
  };
}

const defaultOptions: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: { intersect: false },
  plugins: {
    legend: { display: true, position: 'top' as const },
  },
  scales: {
    x: { grid: { display: false } },
    y: { beginAtZero: false },
  },
};

type Props = { data?: ChartData; options?: ChartOptions };

// daisyUI has no chart component, so this mounts Chart.js (a framework-agnostic
// canvas library) on a <canvas> ref. Chart.js stays browser-only, so it is only
// initialised once the DOM is settled; the instance is destroyed on cleanup.
export function LineChart(props: Props) {
  let ref: HTMLCanvasElement | undefined;
  let chart: Chart | undefined;

  onSettled(() => {
    if (!ref) return;
    chart = new Chart(ref, {
      type: 'line',
      data: props.data ?? buildData(),
      options: props.options ?? defaultOptions,
    });
  });

  onCleanup(() => {
    chart?.destroy();
    chart = undefined;
  });

  return (
    <div class="relative h-72 w-full">
      <canvas ref={ref} />
    </div>
  );
}

export default LineChart;
