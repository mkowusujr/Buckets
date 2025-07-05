import TotalStats from '@/components/Stats/TotalStats';
import Drops from '@/components/Drops/Drops';
import DropFilter from '@/components/Input/DropFilter';

export default function Home() {
  return (
    <div className="flex justify-around">
      <TotalStats />
      <div className="p-2 flex flex-col items-center gap-10">
        <DropFilter />
        <Drops />
      </div>
    </div>
  );
}
