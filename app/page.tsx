import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect('/en'); // ← всегда перенаправляем на английский
}
