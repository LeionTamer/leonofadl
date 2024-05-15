import { Petit_Formal_Script, Biryani } from 'next/font/google'

const handwritten = Petit_Formal_Script({
  weight: '400',
  subsets: ['latin'],
})

const biryani = Biryani({ weight: '400', subsets: ['latin'] })

type SectionInfoType = {
  title: string
  description: string
}

type SectionRecord = Record<string, SectionInfoType[]>

const menu: SectionRecord = {
  entree: [
    {
      title: 'Polyglot - Two Ways',
      description:
        'I can say the word "dinner" in three different languages. I can also code in C and Ruby, but I mostly work with JavaScript/TypeScript.',
    },
    {
      title: 'Skill Tapas',
      description:
        'I started off as a firmware developer, moved to Australia and became a tester, then a QA engineer. Now, I am a full stack developer.',
    },
  ],
  main: [
    {
      title: 'Proof Of Concept Creator',
      description:
        'If you have a concept or idea, I can build a website using NextJS!',
    },
    {
      title: 'Geospatial Visualiser',
      description:
        'All I need is GeoJSON data, and we can put things on a map. We can do it with DeckGL and Leaflet.',
    },
    {
      title: 'AI Assisted Developer',
      description:
        'With OpenAI, I have created a social media content editor. Feel free to ask me more about it.',
    },
  ],
  dessert: [
    {
      title: 'Gourmet Explorer',
      description:
        'After exploring in Adelaide, I can recommend some pretty good places to eat for lunch and dinner.',
    },
    {
      title: 'Butterflied Socialite',
      description:
        'I have organised a few parties, pub crawls, and wine tours. And a bit of improvising too.',
    },
  ],
}

function DeveloperProfile() {
  return (
    <div className={`my-2 md:my-10 text-center text-[#8f250c] `}>
      <div className={`text-5xl font-bold mb-10 ${handwritten.className}`}>
        A Taste Of Leon
      </div>
      <div className={`flex flex-col gap-10 mt-5 `}>
        {Object.entries(menu).map(([section, items]) => (
          <div
            key={section}
            className={`text-4xl font-bold ${biryani.className}`}
          >
            {section === 'entree' ? '' : '---'}
            <div className={`mt-5 flex flex-col gap-5`}>
              {items.map((item) => (
                <div key={item.title} className="mt-3">
                  <div
                    className={`text-2xl font-semibold ${biryani.className}`}
                  >
                    {item.title}
                  </div>
                  <div className={`text-base mt-1 ${biryani.className}`}>
                    {item.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DeveloperProfile
