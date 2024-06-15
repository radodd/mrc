import Image from "next/image";

export default function NewsArticles() {
  return (
    <div className="section-padding flex-col pl-[70px]">
      <h1 className="pb-10">News Articles</h1>

      <div className="flex justify-between">
        {/* First Article */}
        <div className="flex gap-6">
          <div>
            <Image src="/moxi.png" alt="" width={325} height={230} />
          </div>
          <div className="w-[240px]">
            <h2>Natural History Museum</h2>
            <p>
              Lúthien ar rochathol an-uir uir velithil ielvathren. Ithil ír
              anlínath ar arthelon i'nórello. Eldalië valinor ar nai quendi, ar
              thalion estel enwathiel arnanor. Aerlinn irína anweryn, hiril alda
              ristaer ar lúthalion úmenethel
            </p>
          </div>
        </div>
        <div className="flex gap-6">
          <div>
            <Image src="/moxi.png" alt="" width={325} height={230} />
          </div>
          <div className="w-[240px]">
            <h2>Natural History Museum</h2>
            <p>
              Lúthien ar rochathol an-uir uir velithil ielvathren. Ithil ír
              anlínath ar arthelon inórello. Eldalië valinor ar nai quendi, ar
              thalion estel enwathiel arnanor. Aerlinn i'rína anweryn, hiril
              alda ristaer ar lúthalion úmenethel
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
