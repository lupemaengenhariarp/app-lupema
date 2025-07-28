import React from 'react';
import { useRouter } from 'next/router';

interface Content {
    title?: string | null;
    uri?: string | null;
}

interface Props {
    content: Content[];
}

const DecoradoMenu = ({ content }: Props) => {
    const router = useRouter();
    const currentSlug = router.query.slug;

    if (!content || content.length === 0) return null;

    const sortedContent = [...content].sort((a, b) =>
        (a.title || '').localeCompare(b.title || '', undefined, { sensitivity: 'base' })
    );

    return (
        <div className="bg-green py-16">
            <h2 className="text-2xl lg:text-4xl text-white text-center py-10 title-800">
                Conheça nossas lojas
            </h2>

            <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-4">
                {sortedContent.map((item) => {
                    const uriSlug = item.uri?.split('/').filter(Boolean).pop();
                    const isActive = uriSlug === currentSlug;

                    return (
                        <a
                            key={item.uri}
                            href={item.uri || '#'}
                            className={`px-6 py-3 rounded-lg font-semibold shadow transition text-white
                                ${isActive ? 'bg-green-700 text-white decoradoMenuHover' : 'decoradoMenu text-green-700 hover:bg-green-100'}
                            `}
                        >
                            {item.title}
                        </a>
                    );
                })}
            </div>
        </div>
    );
};

export default DecoradoMenu;
