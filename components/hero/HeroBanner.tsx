import TypewriterEffect from "../TypewriterEffect/TypewriterEffect";

export default function HeroBanner() {
  return (
    <div className="flex flex-col justify-center gap-5">
      <TypewriterEffect />
      <p className="text-center font-thin text-gray-400 px-4">
        Discover a new language through realistic and captivating dialogues.
      </p>
    </div>
  );
}
