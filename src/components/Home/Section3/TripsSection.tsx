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
      <div></div>
    );
}