import { IoMdClose } from 'react-icons/io';
import { Empreendimento_Empreendimento } from '../../generated';

interface Props {
  setValueStage: (value: string) => void;
  data: Empreendimento_Empreendimento;
}

const ModalStage = ({ setValueStage, data }: Props) => {
  const content = data.andamentoDaObra?.map((item) => {
    if (item?.nomeAndamentoDaObra != null) {
      return (
        <div className="text-center">
          <div className="border-4 border-white flex items-center justify-center rounded-[50%] w-[110px] sm:w-[130px] h-[110px] sm:h-[130px] mx-auto">
            <span className="text-4xl">
              {item?.valorAndamentoDaObra === null
                ? 0
                : item?.valorAndamentoDaObra}
              %
            </span>
          </div>
          <p>{item?.nomeAndamentoDaObra}</p>
        </div>
      );
    }
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full h-full flex items-center justify-center bg-black/75">
      <div className="bg-green py-8 text-white w-auto rounded-3xl text-center">
        <div className="relative px-8 overflow-auto h-[450px] scrollbar">
          <button
            onClick={() => setValueStage('close')}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-white p-[5px] h-[30px] w-[30px] rounded-[50%]"
          >
            <IoMdClose
              size={20}
              className="hover:rotate-90 transition-all text-green"
            />
          </button>
          <h2>Status da obra: {data.estagioDaObra?.name}</h2>
          <small>Última atualização: {data.empDataDeInsercao}</small>
          <div className="py-8 grid grid-cols-2 sm:grid-cols-4 items-start sm:items-center justify-center gap-6">
            {content}
            <div className="col-span-2 sm:col-span-4">
              <div className="border-4 bg-white text-green flex items-center justify-center rounded-[50%] w-[130px] sm:w-[150px] h-[130px] sm:h-[150px] mx-auto">
                <span className="text-4xl">{data.totalDaObra}%</span>
              </div>
              <p className="uppercase">Total da obra</p>
            </div>
          </div>
          {data.empPrevisaoDeTermino && (
            <p>Previsão de término: {data.empPrevisaoDeTermino}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalStage;
