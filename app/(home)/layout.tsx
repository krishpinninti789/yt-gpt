import AppShell from "../components/AppShell";

export default function HomeLayout({ children }: LayoutProps<"/">) {
  return <AppShell>{children}</AppShell>;
}
