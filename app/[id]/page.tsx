import Image from "next/image";

async function getData(id: string) {
  const res = await fetch(
    `https://api.rawg.io/api/games/${id}?key=${process.env.NEXT_PUBLIC_KEY_ID}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const page = async ({ params }: { params: { id: string } }) => {
  const data = await getData(params.id);
  return (
    <div>
      <h1>{data.name}</h1>
      <Image
        src={data.background_image}
        alt="Picture of the author"
        width={500}
        height={400}
        className="object-cover"
      />
    </div>
  );
};

export default page;
