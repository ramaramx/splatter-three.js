type Props = {
  onClick: () => void
  disabled: boolean
  title: string
}
const Index = ({ onClick, disabled, title }: Props) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {title}
    </button>
  );
};

export default Index;