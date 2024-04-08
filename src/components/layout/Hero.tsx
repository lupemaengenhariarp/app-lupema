import { RootQueryToBannerConnection } from '../../generated';
import BannerArt from './BannerArt';
import BannerCustom from './BannerCustom';
import SlideApp from './Slide';

interface Props {
  banners: RootQueryToBannerConnection | undefined;
}

const HeroApp = ({ banners }: Props) => {
  const items = banners?.nodes?.map((item) => {
    if (item.banner_home?.bannerPronto === true) {
      return <BannerArt content={item.banner_home.imagensProntas} />;
    } else {
      return (
        <BannerCustom content={item.banner_home?.bhConteudo} link={true} />
      );
    }
  });

  return (
    <div className="hero">
      <SlideApp
        items={items}
        largura={{ desktop: 0, mobile: 0 }}
        infinite={true}
        navigation={false}
        dots={false}
        autoPlay={true}
      />
    </div>
  );
};

export default HeroApp;
