import Image from 'next/image';
import SocialIcons from '../../components/layout/SocialIcons';
import AuthorBlock from '../../components/layout/AuthorBlock';
import BlogItem from '../../components/layout/BlogItem';

export default function SinglePost() {
  return (
    <main className="bg-bgi pt-44 border-b border-white/20">
      <div className="container text-white">
        <div className="space-y-6 pr-20">
          <span className="text-xl sm:text-3xl text-green font-medium">BLOG</span>
          <h1 className="text-3xl sm:text-5xl uppercase">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h1>
          <p>
            orem ipsum dolor sit amet, consectetur adipiscing elit. Ut
            consectetur, ante non vulputate pharetra, sem nibh fringilla quam,
            non efficitur risus lorem nec massa. Vestibulum maximus, arcu vel
            egestas dignissim, nulla sem varius felis, id euismod libero nibh in
            lorem.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start py-20">
          <aside className="w-full max-w-md space-y-6 xl:sticky top-44">
            <div className="space-y-4 border-b border-white/20 pb-6">
              <span className="text-xl sm:text-2xl text-green font-medium">Autor:</span>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-zinc-400" />
                <p className="text-xl sm:text-2xl">Paulo André</p>
              </div>
            </div>

            <div className="space-y-4 border-b border-white/20 pb-6">
              <span className="text-xl sm:text-2xl text-green font-medium">Data:</span>
              <div className="flex items-center gap-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="34"
                  height="34"
                  viewBox="0 0 34 34"
                  fill="none"
                >
                  <path
                    d="M9.6441 0C9.95971 0 10.2624 0.125375 10.4856 0.348543C10.7087 0.571711 10.8341 0.874392 10.8341 1.19V3.4153H23.613V1.2053C23.613 0.889692 23.7384 0.587011 23.9615 0.363843C24.1847 0.140675 24.4874 0.0153 24.803 0.0153C25.1186 0.0153 25.4213 0.140675 25.6445 0.363843C25.8676 0.587011 25.993 0.889692 25.993 1.2053V3.4153H30.6C31.5014 3.4153 32.366 3.77328 33.0036 4.41054C33.6411 5.04779 33.9995 5.91216 34 6.8136V30.6017C33.9995 31.5031 33.6411 32.3675 33.0036 33.0048C32.366 33.642 31.5014 34 30.6 34H3.4C2.49856 34 1.63401 33.642 0.996438 33.0048C0.358863 32.3675 0.000450721 31.5031 0 30.6017L0 6.8136C0.000450721 5.91216 0.358863 5.04779 0.996438 4.41054C1.63401 3.77328 2.49856 3.4153 3.4 3.4153H8.4541V1.1883C8.45455 0.872987 8.58012 0.570742 8.80324 0.347942C9.02636 0.125141 9.32879 -3.21748e-07 9.6441 0ZM2.38 13.1614V30.6017C2.38 30.7356 2.40638 30.8683 2.45764 30.992C2.5089 31.1158 2.58404 31.2282 2.67875 31.323C2.77347 31.4177 2.88591 31.4928 3.00966 31.5441C3.13341 31.5953 3.26605 31.6217 3.4 31.6217H30.6C30.7339 31.6217 30.8666 31.5953 30.9903 31.5441C31.1141 31.4928 31.2265 31.4177 31.3213 31.323C31.416 31.2282 31.4911 31.1158 31.5424 30.992C31.5936 30.8683 31.62 30.7356 31.62 30.6017V13.1852L2.38 13.1614ZM11.3339 24.8523V27.6845H8.5V24.8523H11.3339ZM18.4161 24.8523V27.6845H15.5839V24.8523H18.4161ZM25.5 24.8523V27.6845H22.6661V24.8523H25.5ZM11.3339 18.0914V20.9236H8.5V18.0914H11.3339ZM18.4161 18.0914V20.9236H15.5839V18.0914H18.4161ZM25.5 18.0914V20.9236H22.6661V18.0914H25.5ZM8.4541 5.7936H3.4C3.26605 5.7936 3.13341 5.81998 3.00966 5.87124C2.88591 5.9225 2.77347 5.99764 2.67875 6.09235C2.58404 6.18707 2.5089 6.29951 2.45764 6.42326C2.40638 6.54702 2.38 6.67965 2.38 6.8136V10.7831L31.62 10.8069V6.8136C31.62 6.67965 31.5936 6.54702 31.5424 6.42326C31.4911 6.29951 31.416 6.18707 31.3213 6.09235C31.2265 5.99764 31.1141 5.9225 30.9903 5.87124C30.8666 5.81998 30.7339 5.7936 30.6 5.7936H25.993V7.3729C25.993 7.68851 25.8676 7.99119 25.6445 8.21436C25.4213 8.43753 25.1186 8.5629 24.803 8.5629C24.4874 8.5629 24.1847 8.43753 23.9615 8.21436C23.7384 7.99119 23.613 7.68851 23.613 7.3729V5.7936H10.8341V7.3576C10.8341 7.67321 10.7087 7.97589 10.4856 8.19906C10.2624 8.42223 9.95971 8.5476 9.6441 8.5476C9.32849 8.5476 9.02581 8.42223 8.80264 8.19906C8.57947 7.97589 8.4541 7.67321 8.4541 7.3576V5.7936Z"
                    fill="white"
                  />
                </svg>
                <p className="text-xl sm:text-2xl">10 de fevereiro de 2026</p>
              </div>
            </div>

            <div className="space-y-4 border-b border-white/20 pb-6">
              <span className="text-xl sm:text-2xl text-green font-medium">Índice:</span>

              <button className="text-left">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                consectetur, ante non.
              </button>
              <button className="text-left">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                consectetur, ante non.
              </button>
              <button className="text-left">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                consectetur, ante non.
              </button>
              <button className="text-left">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                consectetur, ante non.
              </button>
            </div>

            <div className="space-y-4">
              <span className="text-xl sm:text-2xl text-green font-medium">Redes:</span>
              <SocialIcons />
            </div>
          </aside>

          <div className="flex-1 xl:px-4">
            <div className="space-y-8 px-0 xl:px-20 mt-24 xl:mt-0">
              <div className="relative aspect-square rounded-3xl max-h-[400px] 2xl:max-h-[550px] w-full mb-8 xl:mb-16">
                <Image
                  src="/2c019e0ab88382949e1ef76ee81146e0b4dd490d.png"
                  alt="Banner"
                  width={1920}
                  height={1000}
                  className="object-cover w-full h-full rounded-3xl"
                />
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                consectetur, ante non vulputate pharetra, sem nibh fringilla
                quam, non efficitur risus lorem nec massa. Vestibulum maximus,
                arcu vel egestas dignissim, nulla sem varius felis, id euismod
                libero nibh in lorem. Etiam at purus ut justo elementum
                dignissim a et tellus. Proin eleifend massa nec ante maximus
                tincidunt ac at purus. Integer sodales dui eget mauris laoreet
                pulvinar. Pellentesque a erat lectus. In consectetur sit amet
                ligula a tempus. Proin porttitor dui quis sodales sagittis. Sed
                at nulla a nulla vulputate hendrerit eget vitae ex. Fusce tempus
                quam ante, ac imperdiet massa fermentum vel.
              </p>
              <p>
                Nunc interdum lacus ac orci pretium, in sagittis ligula
                consequat. Sed tincidunt ipsum eu lobortis efficitur. Sed
                facilisis justo vel lacus imperdiet efficitur. Morbi blandit,
                neque vel rutrum tincidunt, dolor orci ultrices dolor,
                vestibulum interdum tellus ligula in diam. Ut ullamcorper nisl
                at suscipit convallis. Etiam in neque bibendum, fringilla nibh
                a, lobortis enim. Nullam ornare urna sed facilisis rhoncus.
              </p>
              <p>
                Morbi pharetra justo vel quam pharetra sodales in et est. Nullam
                in sollicitudin lacus. Mauris in ullamcorper sem. Donec vel
                nulla ante. Nam vel dictum leo. Integer consequat erat diam, id
                lobortis nunc porttitor eget. In in ante at augue mattis tempus.
                Etiam venenatis risus ante, in dictum quam porttitor vitae.
                Mauris interdum eros nulla, sit amet pellentesque est commodo
                non. Aliquam accumsan mattis dolor, quis imperdiet augue
                fringilla ut. Curabitur eu nibh nec ante laoreet egestas.
              </p>
              <p>
                Aliquam erat volutpat. Ut convallis egestas scelerisque. Cras
                efficitur libero vitae lacus bibendum, in cursus tellus ornare.
                Vestibulum ac interdum neque. In accumsan leo ac mollis
                pulvinar. Nam et velit ultricies, blandit lectus commodo,
                euismod ante. Aenean finibus ac erat id hendrerit. Donec in orci
                ullamcorper, fermentum nulla ut, ultricies mauris. Ut rhoncus
                ante et sem dictum mollis. Donec vestibulum non nibh quis
                laoreet. Aliquam in luctus arcu. Sed tellus libero, facilisis at
                placerat lacinia, molestie id elit. Proin vitae volutpat nisl,
                nec sodales sapien. Integer accumsan porttitor quam in accumsan.
                Etiam consequat vitae neque a efficitur.
              </p>
            </div>

            <div className="relative xl:aspect-square rounded-3xl max-h-[310px] w-full my-16">
              <Image
                src="/banner-group.png"
                alt="Banner"
                width={1920}
                height={320}
                className="object-cover w-full h-full rounded-3xl"
              />
            </div>

            <div className="space-y-8 px-0 xl:px-20">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                consectetur, ante non vulputate pharetra, sem nibh fringilla
                quam, non efficitur risus lorem nec massa. Vestibulum maximus,
                arcu vel egestas dignissim, nulla sem varius felis, id euismod
                libero nibh in lorem. Etiam at purus ut justo elementum
                dignissim a et tellus. Proin eleifend massa nec ante maximus
                tincidunt ac at purus. Integer sodales dui eget mauris laoreet
                pulvinar. Pellentesque a erat lectus. In consectetur sit amet
                ligula a tempus. Proin porttitor dui quis sodales sagittis. Sed
                at nulla a nulla vulputate hendrerit eget vitae ex. Fusce tempus
                quam ante, ac imperdiet massa fermentum vel.
              </p>
              <p>
                Nunc interdum lacus ac orci pretium, in sagittis ligula
                consequat. Sed tincidunt ipsum eu lobortis efficitur. Sed
                facilisis justo vel lacus imperdiet efficitur. Morbi blandit,
                neque vel rutrum tincidunt, dolor orci ultrices dolor,
                vestibulum interdum tellus ligula in diam. Ut ullamcorper nisl
                at suscipit convallis. Etiam in neque bibendum, fringilla nibh
                a, lobortis enim. Nullam ornare urna sed facilisis rhoncus.
              </p>
              <p>
                Morbi pharetra justo vel quam pharetra sodales in et est. Nullam
                in sollicitudin lacus. Mauris in ullamcorper sem. Donec vel
                nulla ante. Nam vel dictum leo. Integer consequat erat diam, id
                lobortis nunc porttitor eget. In in ante at augue mattis tempus.
                Etiam venenatis risus ante, in dictum quam porttitor vitae.
                Mauris interdum eros nulla, sit amet pellentesque est commodo
                non. Aliquam accumsan mattis dolor, quis imperdiet augue
                fringilla ut. Curabitur eu nibh nec ante laoreet egestas.
              </p>
              <p>
                Aliquam erat volutpat. Ut convallis egestas scelerisque. Cras
                efficitur libero vitae lacus bibendum, in cursus tellus ornare.
                Vestibulum ac interdum neque. In accumsan leo ac mollis
                pulvinar. Nam et velit ultricies, blandit lectus commodo,
                euismod ante. Aenean finibus ac erat id hendrerit. Donec in orci
                ullamcorper, fermentum nulla ut, ultricies mauris. Ut rhoncus
                ante et sem dictum mollis. Donec vestibulum non nibh quis
                laoreet. Aliquam in luctus arcu. Sed tellus libero, facilisis at
                placerat lacinia, molestie id elit. Proin vitae volutpat nisl,
                nec sodales sapien. Integer accumsan porttitor quam in accumsan.
                Etiam consequat vitae neque a efficitur.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full xl:max-w-[80%] mx-auto">
          <AuthorBlock />
        </div>
      </div>

      <section className="py-16 sm:py-28">
        <div className="flex items-center justify-start border-y border-white/20 h-20">
          <div className="border-r border-white/20 w-28 h-full" />
          <div className="border-x border-white/20 px-9 h-full flex items-center justify-center w-max">
            <span className="text-white text-2xl">Veja também</span>
          </div>
        </div>

        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 pt-16 sm:pt-28">
            <BlogItem />
            <BlogItem />
            <BlogItem />
            <BlogItem />
          </div>
        </div>
      </section>
    </main>
  );
}
