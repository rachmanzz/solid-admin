// Placeholder shown when a list/table has no data, to avoid a confusing blank.
export default function EmptyState(props: { message: string }) {
  return (
    <div class="py-10 text-center text-base-content/50">
      <p>{props.message}</p>
    </div>
  );
}
