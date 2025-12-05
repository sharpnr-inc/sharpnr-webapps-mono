import MainMenuButton from "./MainMenuButton";

export default function MainHeader() {
  return (
    <div className="w-full p-2 border-b">
      <div className="flex justify-between border p-2">
        <div>
          <MainMenuButton/>
        </div>
        <div>Button</div>
      </div>
    </div>
  );
}
