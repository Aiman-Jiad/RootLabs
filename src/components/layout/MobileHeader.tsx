import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

export function MobileHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur md:hidden">
      <Logo />
      <ThemeToggle />
    </header>
  );
}
