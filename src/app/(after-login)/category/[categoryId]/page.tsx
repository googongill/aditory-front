import LinkCard from '@/components/link-card';
import { Label } from '@/components/ui/label';

export default function CategoryDetailPage({
  categoryId,
}: {
  categoryId: string;
}) {
  return (
    <div className='flex h-full min-h-dvh w-full flex-col items-center gap-4 rounded-xl bg-card p-10'>
      <Label htmlFor='categoryName' className='text-2xl font-semibold'>
        category name
      </Label>
      <LinkCard />
      <LinkCard />
      <LinkCard />
      <LinkCard />
      <LinkCard />
      <LinkCard />
      <LinkCard />
      <LinkCard />
    </div>
  );
}
