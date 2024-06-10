import Meteors from "./Meteore";

function MeteorDemo() {
  return (
    <div className="relative flex w-[25%] h-[95%]  max-w-xs max-h-[200px] m-5  pb-1 items-center justify-center overflow-hidden rounded-lg border bg-white ">
      <Meteors number={30} />
      <div className="w-full h-full flex flex-col items-start justify-around pl-2">
        <p className="z-10  h-fit text-center text-1xl tracking-tighter text-black ">
          Welcome,
        </p>
        <p className="z-10 w-full text-center text-2xl pb-5 tracking-tighter text-black pr-2 ">22DIT022</p>
      </div>
    </div>
  );
}

export default MeteorDemo;
