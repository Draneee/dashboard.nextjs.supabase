import { cn } from '@/lib/utils';

const BlockColor = ({ className }: IProps) => {
  return (
    <div
      className={cn(
        `min-h-4 w-full bg-white group-hover:bg-blueTest transition`,
        className
      )}
    ></div>
  );
};

export default BlockColor;

interface IProps {
  className?: string;
}
