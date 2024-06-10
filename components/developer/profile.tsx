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
      title: 'Epicurean Experiment Engineer',
      description: 'If you have a concept or idea, I can build it with NextJS!',
    },
    {
      title: 'Layered Terrain Designer',
      description:
        'With a sprinkle of DeckGL and pinch of Mapbox with Leaflet on the side, I can serve a delectable geographic visualisation on a map.',
    },
    {
      title: 'Haute and Savory Script Specialists',
      description:
        'With OpenAI, I have created tools and demos that simplifies day to day tasks.',
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
    <div className={`my-2 text-center text-[#8f250c] md:my-10`}>
      <div className={`mb-10 text-5xl font-bold ${handwritten.className}`}>
        A Taste Of Leon
      </div>
      <div className={`mt-5 flex flex-col gap-10`}>
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
                  <div className={`mt-1 text-base ${biryani.className}`}>
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
