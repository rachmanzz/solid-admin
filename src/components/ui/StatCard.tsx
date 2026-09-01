// A single stat display: label, value, and an optional trend hint.
export default function StatCard(props: { label: string; value: string; trend?: string }) {
  return (
    <div class="stats">
      <div class="stat">
        <div class="stat-title">{props.label}</div>
        <div class="stat-value">{props.value}</div>
        {props.trend ? <div class="stat-desc">{props.trend} this week</div> : null}
      </div>
    </div>
  );
}
