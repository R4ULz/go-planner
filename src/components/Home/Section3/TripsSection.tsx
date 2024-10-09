import Image from "next/image"

export default function TripsSection() {
    const trips = [
        {
            image: '/imgs/country-Brazil.png',
            title: 'Rio de Janeiro, Brasil',
            style: 'col-span-1 row-span-2'
          },
          {
            image: '/imgs/country-Italia.png',
            title: 'Ponte de Algum Lugar',
            style: 'col-span-1'
          },
          {
            image: '/imgs/country-EUA.png',
            title: 'Estados Unidos, Disney',
            style: 'col-span-1'
          },
          {
            image: '/imgs/country-Espanha.png',
            title: 'Praia Paradisíaca',
            style: 'col-span-1 row-span-2'
          },
          {
            image: '/imgs/country-Tokyo.png',
            title: 'Cidade Luzes Noturnas',
            style: 'col-span-1'
          },
          {
            image: '/imgs/country-França.png',
            description: 'Uma curiosidade interessante sobre Paris é que a cidade tem uma Estátua da Liberdade...',
            title: 'Paris, França',
            style: 'col-span-1'
          }
    ]

    return (
      <div className="max-w-screen-xl w-full justify-center flex flex-col">
          <div className="flex flex-row">
                <h1 className="font-rubik font-bold text-black text-4xl md:text-3xl ">Viagens populares</h1><span className="flex flex-row bg-roxo size-2 rounded-full p-1 relative top-6 mx-1"></span>
          </div>

          <div id="container" className="w-full">
            <div id="coluna01" className="w-4/12 h-96">
            
              <div className="w-full h-8/12 bg-zinc-500">
                  a
              </div>
            </div>


            <div id="coluna02"  className="w-8/12">

            </div>
          </div>
      </div>
    );
}