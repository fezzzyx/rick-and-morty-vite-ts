interface Props {
    name: string;
    image: string;
}

export default function CharacterCard({ name, image }: Props) {
    return (
        <div className="bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer">
            <img src={image} alt={name} className="rounded-t-xl w-full object-cover" />
            <div className="p-4 font-semibold text-gray-800">{name}</div>
        </div>
    );
}
