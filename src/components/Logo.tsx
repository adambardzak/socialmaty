export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="inline-flex h-7 w-7 items-center justify-center bg-accent text-white font-display font-bold text-sm rounded-lg">
        G
      </span>
      <span className="font-display font-bold tracking-tight">
        Growmat Systém<span className="text-accent">®</span>
      </span>
    </span>
  );
}
