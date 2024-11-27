import connect from "../../lib/mongoose";
import User from "../../models/User";
import Trip from "../../models/Trip";

export default async function GetDashboardData(req, res) {
  await connect();

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { ano } = req.query; // Pega o ano da query string
  const anoAtual = ano ? parseInt(ano) : new Date().getFullYear(); // Ano atual como padrão

  // Intervalo para o ano especificado
  const inicioAno = new Date(`${anoAtual}-01-01T00:00:00Z`); // 1º de Janeiro do ano especificado
  const fimAno = new Date(`${anoAtual + 1}-01-01T00:00:00Z`); // 1º de Janeiro do próximo ano

  // Intervalo para o dia atual
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const tomorrow = new Date();
  tomorrow.setUTCDate(today.getUTCDate() + 1);

  try {
    // Contagens gerais
    const totalUsers = await User.countDocuments();
    const totalTrips = await Trip.countDocuments();

    // Contagens diárias
    const newUsersToday = await User.countDocuments({
      createdAt: { $gte: today, $lt: tomorrow },
    });
    const newTripsToday = await Trip.countDocuments({
      dataInicio: { $gte: today, $lt: tomorrow },
    });

    // Agregação mensal para o ano especificado
    const usuariosMensais = await User.aggregate([
      {
        $match: {
          createdAt: {
            $gte: inicioAno,
            $lt: fimAno,
          },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" }, // Agrupa pelo mês do campo createdAt
          total: { $sum: 1 }, // Conta o número de documentos no mês
        },
      },
      {
        $sort: { _id: 1 }, // Ordena os meses (1: Janeiro, 2: Fevereiro, ...)
      },
    ]);

    const viagensMensais = await Trip.aggregate([
      {
        $match: {
          dataInicio: {
            $gte: inicioAno,
            $lt: fimAno,
          },
        },
      },
      {
        $group: {
          _id: { $month: "$dataInicio" }, // Agrupa pelo mês do campo dataInicio
          total: { $sum: 1 }, // Conta o número de documentos no mês
        },
      },
      {
        $sort: { _id: 1 }, // Ordena os meses
      },
    ]);

    // Resposta final
    res.json({
      totalUsers,
      totalTrips,
      newUsersToday,
      newTripsToday,
      usuariosMensais,
      viagensMensais,
    });
  } catch (erro) {
    console.error("Erro ao buscar dados do dashboard:", erro);
    res.status(500).json({ error: "Erro ao buscar dados do dashboard" });
  }
}
