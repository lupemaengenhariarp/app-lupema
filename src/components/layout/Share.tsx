import { IoMdClose } from 'react-icons/io';
import { FaRegCopy } from 'react-icons/fa';
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from 'react-share';

interface Props {
  setModalShare: (value: string) => void;
  url: string;
}

const ShareButtons = ({ url, setModalShare }: Props) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full h-full flex items-center justify-center bg-black/75">
      <div className="bg-white p-8 max-w-[450px] relative rounded-3xl text-center">
        <button
          onClick={() => setModalShare('close')}
          className="absolute top-4 right-4 w-[30px]"
        >
          <IoMdClose size={20} className="hover:rotate-90 transition-all" />
        </button>
        <h2 className="text-center text-green text-2xl uppercase">
          Compartilhar
        </h2>
        <div className="grid grid-cols-4 gap-8 mt-8">
          <WhatsappShareButton url={url}>
            <WhatsappIcon size={32} round={true} />
          </WhatsappShareButton>
          <FacebookShareButton url={url}>
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>
          <TwitterShareButton url={url}>
            <TwitterIcon size={32} round={true} />
          </TwitterShareButton>
          <LinkedinShareButton url={url}>
            <LinkedinIcon size={32} round={true} />
          </LinkedinShareButton>
          <FacebookMessengerShareButton title="" appId="" url={url}>
            <FacebookMessengerIcon size={32} round={true} />
          </FacebookMessengerShareButton>
          <TelegramShareButton url={url}>
            <TelegramIcon size={32} round={true} />
          </TelegramShareButton>
          <EmailShareButton url={url}>
            <EmailIcon size={32} round={true} />
          </EmailShareButton>
          <button
            onClick={() => navigator.clipboard.writeText(url)}
            className="bg-[#7f7f7f] rounded-[50%] p-2"
          >
            <FaRegCopy size={18} color="white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareButtons;
