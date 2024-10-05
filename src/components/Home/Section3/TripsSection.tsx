import Image from "next/image"

export default function TripsSection() {
    const trips = [
        {
            image: '/imgs/rio.jpg',
            title: 'Rio de Janeiro, Brasil',
            style: 'col-span-1 row-span-2'
          },
          {
            image: '/imgs/bridge.jpg',
            title: 'Ponte de Algum Lugar',
            style: 'col-span-1'
          },
          {
            image: '/imgs/castle.jpg',
            title: 'Castelo Mágico',
            style: 'col-span-1'
          },
          {
            image: '/imgs/beach.jpg',
            title: 'Praia Paradisíaca',
            style: 'col-span-1 row-span-2'
          },
          {
            image: '/imgs/city.jpg',
            title: 'Cidade Luzes Noturnas',
            style: 'col-span-1'
          },
          {
            image: '/imgs/paris.jpg',
            description: 'Uma curiosidade interessante sobre Paris é que a cidade tem uma Estátua da Liberdade...',
            title: 'Paris, França',
            style: 'col-span-1'
          }
    ]

    return (
            <div className="bg-white p-5 w-full">
              <h2 className="text-2xl font-bold mb-5">Viagens populares</h2>
              <div className="grid grid-cols-3 gap-4">
                {trips.map((trip, index) => (
                  <div key={index} className={`relative ${trip.style} h-48 md:h-96`}>
                    <Image
                      src={trip.image}
                      alt={trip.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                    <h3 className="absolute bottom-0 left-0 bg-black text-white text-sm p-2 rounded-tl-lg rounded-br-lg">{trip.title}</h3>
                  </div>
                ))}
              </div>
            </div>
    );
}