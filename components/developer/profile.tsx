type SectionInfoType = {
  title: string
  description: string
}

type SectionRecord = Record<string, SectionInfoType[]>

const menu: SectionRecord = {
  entree: [
    {
      title: 'Multiple language support',
      description:
        'I can say the word "cat" in three different languages. I can also code in C and Ruby, but I mostly work with JavaScript/TypeScript.',
    },
    {
      title: 'Varied Experience',
      description:
        'I started off as a firmware developer, moved to Australia and became a tester, then a QA engineer. Now, I am a full stack developer.',
    },
  ],
  main: [
    {
      title: 'Software Builder',
      description:
        'If you have a concept or idea, I can build a website using NextJS!',
    },
    {
      title: 'Geospatial Visualiser',
      description:
        'All I need is GeoJSON data, and we can put things on a map. We can do it with DeckGL and Leaflet.',
    },
    {
      title: 'AI demo maker',
      description:
        'With OpenAI, I have created a social media content editor. Feel free to ask me more about it.',
    },
  ],
  dessert: [
    {
      title: 'Foodie',
      description:
        'After exploring in Adelaide, I can recommend some pretty good places to eat for lunch and dinner.',
    },
    {
      title: 'social butterly',
      description:
        'I have organised a few parties, pub crawls, and wine tours.',
    },
  ],
}

function DeveloperProfile() {
  return (
    <div className="my-auto text-center">
      <div className="text-5xl font-bold">About Me</div>
      <div className="flex flex-col gap-10 mt-10">
        {Object.entries(menu).map(([section, items]) => (
          <div key={section} className="text-4xl font-bold">
            {section}
            <div className="mt-3 flex flex-col gap-5">
              {items.map((item) => (
                <div key={item.title}>
                  <div className="text-2xl font-semibold">{item.title}</div>
                  <div className="text-base mt-1">{item.description}</div>
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
