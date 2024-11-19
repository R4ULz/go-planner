import Link from 'next/link';

export default function txtSobre(){
    return(
        <div className="w-2/4 font-rubik">
            <div className="gap-10 flex flex-col">
                <p>
                    No Go.Planner, acreditamos que viajar é muito mais do que chegar a um destino — é sobre explorar, 
                    descobrir e criar memórias inesquecíveis. Somos apaixonados por tornar o planejamento de viagens simples, 
                    eficiente e personalizado, para que você possa focar no que realmente importa: viver experiências incríveis.
                </p>

                <p>
                    Nosso objetivo é ser seu parceiro confiável em cada etapa da jornada. Seja uma escapada de fim de semana, 
                    uma viagem internacional ou uma aventura espontânea, o Go.Planner foi criado para ajudar você a organizar 
                    todos os detalhes com facilidade. Com ferramentas intuitivas, recursos inteligentes e uma interface amigável, 
                    conectamos suas ideias, preferências e necessidades para criar roteiros únicos e completos.
                </p>

                <p>
                    O que nos move é a paixão por descomplicar o planejamento e inspirar mais pessoas a saírem do papel e explorarem o mundo. 
                    No Go.Planner, suas viagens estão em boas mãos — e o mundo, ao seu alcance.
                </p>

                <p className='flex justify-center'>
                    <Link href="/criarViagem" className='text-black hover:underline hover:text-blue-500'>
                        Vamos planejar juntos? 🚀✈️
                    </Link>
                </p>
            </div>
        </div>
    )
}