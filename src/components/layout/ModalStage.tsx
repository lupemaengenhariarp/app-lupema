import { IoMdClose } from 'react-icons/io';
import {
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Empreendimento_Empreendimento } from '../../generated';

interface Props {
  setValueStage: (value: string) => void;
  data: Empreendimento_Empreendimento;
}

const ModalStage = ({ setValueStage, data }: Props) => {
  const renderPieChart = (value: number) => {
    const pieData = [
      { name: 'Concluído', value: value },
      { name: 'Faltando', value: 100 - value },
    ];

    const COLORS = ['#729f2d', '#3d403f'];

    return (
      <PieChart width={100} height={100}>
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          startAngle={90}
          endAngle={-270}
          outerRadius={50}
          dataKey="value"
          stroke="#28292e" // contorno do gráfico igual ao fundo (clean)
          strokeWidth={2}
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    );
  };

  const content = data.andamentoDaObra?.map((item, index) => {
    const valor = Number(item?.valorAndamentoDaObra) || 0;
    return item?.nomeAndamentoDaObra != null ? (
      <div key={index} className="text-center">
        <div className="relative w-[100px] h-[100px] mx-auto">
          {renderPieChart(valor)}
          <div className="absolute inset-0 flex items-center justify-center text-white font-semibold text-[16px]">
            {Math.round(valor)}%
          </div>
        </div>
        <p className="mt-1 text-white">{item.nomeAndamentoDaObra}</p>
      </div>
    ) : null;
  });

  const totalValue = Number(data.totalDaObra) || 0;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full h-full flex items-center justify-center bg-black/75">
      <div
        className="bg-[#28292e] py-6 px-6 w-auto rounded-2xl text-center shadow-[0_8px_30px_rgba(0,0,0,0.8)]"
      >
        <div className="relative px-4 overflow-auto max-h-[90vh] scrollbar">
          <button
            onClick={() => setValueStage('close')}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-white p-[5px] h-[30px] w-[30px] rounded-full"
          >
            <IoMdClose
              size={20}
              className="hover:rotate-90 transition-all text-[#729f2d]"
            />
          </button>

          <h2 className="text-lg sm:text-xl font-bold text-white">
            Status da obra: {data.estagioDaObra?.name}
          </h2>
          <small className="block mb-4 text-white/80">
            Última atualização: {data.empDataDeInsercao}
          </small>

          <div className="py-6 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">
            {content}

            {/* Gráfico Total da Obra */}
            <div className="col-span-2 sm:col-span-3 mt-4 flex flex-col items-center justify-center">
              <div className="relative w-[140px] h-[140px]">
                <PieChart width={140} height={140}>
                  <Pie
                    data={[
                      { name: 'Concluído', value: totalValue },
                      { name: 'Faltando', value: 100 - totalValue },
                    ]}
                    cx="50%"
                    cy="50%"
                    startAngle={90}
                    endAngle={-270}
                    outerRadius={60}
                    dataKey="value"
                    stroke="#28292e"
                    strokeWidth={2}
                  >
                    <Cell fill="#729f2d" />
                    <Cell fill="#3d403f" />
                  </Pie>
                </PieChart>
                <div className="absolute inset-0 flex items-center justify-center font-bold text-[22px] text-white">
                  {Math.round(totalValue)}%
                </div>
              </div>
              <p className="uppercase mt-2 text-[14px] sm:text-[16px] text-white">
                Total da obra
              </p>
            </div>
          </div>

          {data.empPrevisaoDeTermino && (
            <p className="mt-4 text-white font-bold">
              Previsão de término: {data.empPrevisaoDeTermino}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalStage;
