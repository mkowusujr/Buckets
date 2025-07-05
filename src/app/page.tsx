import Drops from './components/Drops/Drops';
import DropFilter from './components/Input/DropFilter';

export default function Home() {
  return (
    <div className="p-2 flex flex-col items-center gap-10">
      <DropFilter />
      <Drops />
    </div>
  );
}
