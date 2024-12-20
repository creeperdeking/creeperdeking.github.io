import React from "react";
import "../components/reset.css";
import "../components/reportstyle.css";
import MusicPlayer from "../components/MusicPlayer";
import gdpCapImage from "./images/gdpcap.png";
import hermannKahnImage from "./images/hermann-kahn.jpg";
import prologueAndThePromiseImage from "./images/prologue_and_promise_full.jpeg";
import newEmphasesPart1Image from "./images/new_emphase1.png";
import newEmphasesPart2Image from "./images/new_emphase2.png";
import greatTransitionImage from "./images/great-transition.png";
import culturalPhasesImage from "./images/cultural_phases.png";
import eternalSourcesImage from "./images/eternal_sources.png";
import unnamedHorseMusic from "./mousic/unnamed-horse.mp3";
import theCricketsMusic from "./mousic/the-crickets.mp3";
import lamentMusic from "./mousic/lamento.mp3";
import { ArticleHeader } from "../components/ArticleHeader";

const PostIndustrialSociety: React.FC = () => {
  return (
    <>
      <ArticleHeader
        title="Report on the Post-Industrial society"
        subtitle="Our life inside Hermann Kahn's World A"
        image={hermannKahnImage}
        author={{
          name: "Alexis Gros",
          email: "alexis.gros99@gmail.com",
          website: "https://alexisgros.fr",
        }}
        creationDate="2024-09-14"
        updatedDate="2024-09-22"
        version="1.1"
      />

      <nav
        id="TOC"
        role="doc-toc"
        style={{ paddingBottom: "1em", paddingTop: "1em" }}
      >
        <h2 id="toc-title">Contents</h2>
        <ul className="incremental">
          <li>
            <a href="#introduction" id="toc-introduction">
              Introduction: We live in Hermann Kahn's World A
            </a>
          </li>
          <li>
            <a href="#the-great-transition" id="toc-the-great-transition">
              The Great Transition
            </a>
          </li>
          <li>
            <a
              href="#the-post-industrial-society"
              id="toc-the-post-industrial-society"
            >
              The Post-Industrial Society
            </a>
          </li>
          <li>
            <a href="#the-new-class" id="toc-the-new-class">
              The New Class
            </a>
          </li>
          <li>
            <a
              href="#his-projections-for-our-world"
              id="toc-his-projections-for-our-world"
            >
              Hit or miss? His projections for our world
            </a>
          </li>
          <li>
            <a href="#conclusion" id="toc-conclusion">
              Conclusion
            </a>
          </li>
          <li>
            <a href="#post-conclusion" id="toc-post-conclusion">
              Post-Conclusion: What about Space?
            </a>
          </li>
        </ul>
      </nav>

      <p>Some music for the ride:</p>

      <MusicPlayer
        playlist={{
          "A Horse With No Name": unnamedHorseMusic,
          "Os Grilos": theCricketsMusic,
          Lamento: lamentMusic,
        }}
      />

      <hr />

      <br />
      <h2 id="introduction">Introduction: We live in Hermann Kahn's World A</h2>
      <figure
        style={{
          float: "right",
          margin: 0,
          padding: "1em",
          paddingBottom: "2em",
        }}
      >
        <img
          src={hermannKahnImage}
          alt="Hermann Kahn"
          style={{ maxWidth: "30%", height: "auto", display: "block" }}
        />
        <figcaption> Hermann Kahn, 1922-1983</figcaption>
      </figure>

      <p>
        Hermann Kahn was a futurist and analyst with a formation in physics. He
        was launched into public notoriety while working for the RAND
        corporation with his book
        <em>On Thermonuclear War (1960)</em>
        (which made him one of the inspirations for the eponymous character in
        Stanley Kubrick's Dr. Strangelove). He became an influential voice in
        policy and forecasting. He does not possess the kind of cult following
        that could keep his ideas and legacy alive like Ayn Rand or the Club of
        Rome, prehaps because his predictions were by and large quite reasonable
        and accurate (boring?), . In addition, his books are not always written
        in a very rigorous, scholarly manner. Add to that being the founder and
        head of the Hudson Institute, a right leaning think tank, and that his
        ideas reflected his generation's focus on progress and economic growth,
        you can see why they might not be particularly fashionable to what he
        defines as the "New Class" of upper middle class intelligentia that have
        emerged since the 1960s.
      </p>

      <p>
        After reading four of his books <em>On Thermonuclear War (1960)</em> ,
        <em>The Year 2000 (1967)</em>, <em>The Next 200 Years (1976)</em> and
        <em>World Economic Development: 1979 And Beyond (1979)</em>, I became
        convinced that he offers us a fascinating window into the post-war
        mentality and attitude toward the future. Certainly his ideas are worth
        revisiting with the benefit of hindsight, since much of his work is
        concerned with forecasting. It is important to note that his forecasting
        books reflect not only his work but those of his colleagues at the
        Hudson Institute as well. After comparing his predictions with what
        actually happenned, I think his books at the time would have provided
        the businessman and political leader alike with a useful framework to
        approach the great trends of the future as it was actually going to
        unfold, despite some inevitable mistakes. As far as forcasting go,
        that's as good as it gets. For this reason alone it's worth trying to
        see how we fit in Hermann Kahn's future. Because in many ways we are
        living in his "World A".
      </p>

      <p>
        For my part, I now include him in this type of clear, practical thinkers
        born around 1920, people that could combine quality, detailed knowledge
        with useful broad abstractions. People such as Lee Kwan Yew, Richard
        Feynman and Henry Kissinger.
      </p>

      <hr />

      <br />

      <h2 id="the-great-transition">The Great Transition</h2>
      <figure
        style={{
          float: "right",
          margin: "0",
          padding: "1em",
          paddingBottom: "2em",
        }}
      >
        <img
          src={greatTransitionImage}
          alt="The Great Transition"
          style={{ maxWidth: "100%", height: "auto", display: "block" }}
        />
      </figure>

      <p>
        For Hermann Kahn, modernity is a process characterized by an S-curve,
        moving us from the pre-industrial to the post-industrial society, and he
        viewed the 1970s as the approximate middlepoint of this transition.
      </p>
      <p>
        In <em>The Year 2000</em>, he defines five stages for the great
        transition. Why split it into stages? Indeed, Kahn speculates that in
        the far future, the great transition will probably be viewed as one
        continuous process, much like we view the agricultural revolution today.
        Yet the stages provide insights into the changing nature of the economy.
        He even gives us a rough range of the gdp per capita for each stage to
        make the picture more concrete:
      </p>

      <table>
        <tr>
          <th>Stage</th>
          <th>Economic makeup</th>
          <th>GDP per capita</th>
        </tr>
        <tr>
          <th>Preindustrial</th>
          <td>Agriculture is the economy</td>
          <td>{"~$300 -> ~$1300"}</td>
        </tr>
        <tr>
          <th>Partially industrialized or transitional</th>
          <td>Agriculture declines as a share of GDP, industry grows</td>
          <td>{"~$1300 -> ~$4000"}</td>
        </tr>
        <tr>
          <th>Industrial</th>
          <td>
            Growth of both industry and services (including transportation),
            agriculture is a small share of GDP
          </td>
          <td>{"~$4000 -> ~$10000"}</td>
        </tr>
        <tr>
          <th>Mass consumption or advanced industrial</th>
          <td>
            Industry starts declining as a share of GDP, while services continue
            to grow
          </td>
          <td>{"~$10000 -> ~$27000"}</td>
        </tr>
        <tr>
          <th>Postindustrial</th>
          <td>
            Both industry and agriculture become an ever smaller share of GDP,
            and even most classical services decline, as most industrial and
            commercial tasks get gradually automated
          </td>
          <td>{"~$27000 -> ~$130000"}</td>
        </tr>
      </table>

      <figcaption>
        Figures taken from "The Year 2000", converted to 2011 US dollars.
      </figcaption>

      <p>
        He delineates the usual caveats about equating gdp per capita with
        standard of living, for example pointing out that altough the Soviet
        Union might get close to the mass consumption stage, lower level of
        consumption caused by high level of investments in capital goods and the
        military lowers the effective standard of living of soviet citizens. Yet
        he believes that these range are still helpful to get a picture of the
        general trend.
      </p>
      <p>
        How do we actually measure up with respect to his development stages?
      </p>
      <figure
        style={{
          float: "right",
          margin: "0",
          padding: "1em",
          paddingBottom: "2em",
        }}
      >
        <img
          src={gdpCapImage}
          alt="GDP per capta for a few countries"
          style={{ maxWidth: "100%", height: "auto", display: "block" }}
        />
        <figcaption>
          GDP per capita figures taken from ourworldindata.org, overlayed with
          the stages of the great transition. This data is adjusted for
          inflation and for differences in the cost of living between countries.
          USSR becomes an amalgamation of the ex-USSR countries after 1991.
        </figcaption>
      </figure>

      <p>
        It is interesting to note that most of the rich nations (much of Europe,
        Japan, Taiwan, South Korea, Singapore, Hong Kong, some petrostates and
        the Anglosphere) are already in the post-industrial stage, and many have
        joined it for some decades already. Indeed, the United States has gotten
        there aruond the late 1970s, while he was still writing. Thus the post
        industrial society is not some far off future, but it should to an
        extent describe the societies we live in today. What did he believe
        would be the characteristics of our post-industrial societies?
      </p>

      <hr />

      <br />

      <h2 id="the-post-industrial-society">The Post-Industrial society</h2>

      <figure
        style={{
          margin: "2em -50%",
          width: "200%",
          maxWidth: "200%",
          padding: "1em",
          paddingBottom: "2em",
          boxSizing: "border-box",
        }}
      >
        <img
          src={prologueAndThePromiseImage}
          alt="The Prologue And the Promise"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
        <figcaption>The Prologue And the Promise, Robert McCall. </figcaption>
      </figure>

      <p>
        As seen in the table above, the post-industrial society is characterised
        by a predominance of services over Industrial or Agricultural
        activities. Services such as:
      </p>

      <ul>
        <li>Transportation</li>
        <li>Tourism</li>
        <li>Entertainment</li>
        <li>
          The "Knowledge economy" (patents, specialised skills, copyrights,
          brands, "content")
        </li>
        <li>Restaurants, hotels, catering</li>
        <li>Consulting</li>
        <li>Marketing</li>
        <li>Advertising</li>
        <li>Education</li>
        <li>Medicine</li>
      </ul>

      <p>
        Another way to characterise the post-industrial economy, is that the
        focus of economic activity is not on playing games with and against
        nature, but on playing games with and against organisations, with and
        against individuals, and perhaps with and against oneself. Game here is
        used in the broadest sense of cooperation, competition and play.
      </p>
      <p>
        An important aspect of the post-industrial economy is that it is
        affluent. Industry is a smaller portion of the economy but not
        necessarily in abolute term, just like the agricultural sector is a
        small part of the economy yet we produce more food than ever before.
        Indeed Hermann Kahn believes that the post-industrial society is also a
        super-industrial society (another name for advanced mass-consumption).
        However, the price of manufactured good will be so small that satisfying
        basic needs such as housing or transportation will be cheap, and thus
        the government might be willing to subsidize a decent "floor" standard
        of living for all citizens.
      </p>

      <p>
        One of the interesting visions he holds for what such a society might
        look like is the concept of the marriage between Machine and Garden.
        Such society would be more suburban than urban, with technology becoming
        at the same time ubuquitous yet blending seamlessly into our daily
        lives. On the other hand, he considers that some societies, such as the
        Japanese, might be comfortable working in an affluent, well designed and
        efficient urban environment.
      </p>

      <p>
        He points out that measures such as GDP are more useful to characterise
        and compare industrial economies than both pre-industrial and
        post-industrial economies. The reason being that in the post-industrial
        economy, an increasing amount of peoples lives will be spent not just on
        services, but on non-transactional activities, such as leisure, hanging
        out with family and friends, cheap entertainment, aesthetic pursuits,
        learning for its own sake, etc. As the price of both services and
        commodities fall, their consumption will not increase proportionally to
        their abundance. A good example today is probably the internet. How much
        time do people spend consuming essentially free content? Internet
        companies are some of the biggest in the world, yet they arguably only
        capture a small fraction of the value they create, much less so for
        example than a railroad or a textile factory. Thus as the price of goods
        and services decreases, the incentive to make more money to buy them
        weakens as the things people actually want to buy are easier to obtain,
        and non-market activities take more and more space in people's lives.
        Reduced incentive for making more money would make most people, with the
        exception of the most competitively driven, work less hard or less
        productively in the economical sense. Thus altough the post-industrial
        society is characterised by a high GDP per capita, it is also harder to
        relate this figure to the average person's standard of living.
      </p>

      <p>
        These are the first two reasons why the post-industrial society is
        characterised by a gradual slow down of economic growth. The next 200
        years was written in part as a response to the book
        <em>The Limits to Growth</em>. In particular, the main difference
        between the two books is that, even if <em>The Next 200 Years</em>{" "}
        believes that economic growth will slow down and perhaps eventually stop
        during the next 200 years, it believes this will be the consequence of
        affluence rather than scarcity. For Hermann Kahn, economic growth will
        not be limited by resources or pollution or food production, but rather
        by societal factors. Growth will slow down because people will not value
        it as much, not because of any physical impossibilities.
      </p>
      <p>
        In particular, he believes that after a certain amount of development,
        the marginal value that people assign to extra wealth diminishes
        sharply, and thus the society's attention is increasingly directed
        toward the negative consequences of technical and industrial
        advancement. Harm reduction, environmental protection and a general
        conservatism toward growth and development gradually takes hold of
        society, leading to a steady state or near steady state economy. He
        foresees that pollution mitigation and other environmental protection
        will be an increasing part of the economy, diverting ressources from
        compounding investments. This slowdown will be concretely implemeted
        through regulations, increasing size of inefficient government
        bureaucracies, and a diminished desire to attain enormous wealth.
      </p>

      <hr />

      <br />

      <h2 id="the-new-class">The New Class</h2>

      <p>
        What is particularily interesting is that he identifies that during the
        process of transition, parts of society start having these
        post-industrial outlooks and values before others. He identifies what he
        calls the New Class, which are university educated, upper middle class
        who do not perceive much benefit from extra growth, and start campaining
        against it, perhaps a bit prematurely. This explains to him the wave of
        anti-nuclear, anti-pollution, anti-industrial malthusian and anti-growth
        movements in the 1960s and 1970s. Like fish in water, they do not
        perceive the superindustrial society of which they are the avant-garde
        and chief beneficiary, and thus become a powerful force for stagnation
        and conservatism. In particular, their high number and strategic place
        in society allows them to have a disproportionate influence on
        regulatory bodies and public opinion. Effectively, they are able to make
        less affluent, working class people advocate against their own
        interests.
      </p>

      <div style={{ marginBottom: "1em" }}>
        <figure>
          <img
            src={newEmphasesPart1Image}
            alt="New Emphases part 1"
            style={{ width: "80%", height: "auto", marginBottom: "1em" }}
          />
          <img
            src={newEmphasesPart2Image}
            alt="New Emphases part 2"
            style={{ width: "80%", height: "auto" }}
          />
          <figcaption>
            The 14 New Emphases, characteristics of the New Class
          </figcaption>
        </figure>
      </div>
      <p>
        For Hermann Kahn, the appearance of this New Class is not necessarily a
        bad thing. Indeed he believes it may be necessary to curb some of the
        excesses of the superindustrial society. After all, according to him,
        gradually the concerns of the New Class will become common to rest of
        society as we get deeper into the post-industrial stage. However, the
        loudness and strategic positionning of this New Class avant-garde in the
        most developped nations may have a negative influence on the development
        of the less developed nations, by giving them mixed messages about the
        value of growth and development, when these countries really do need to
        unify their society toward industrial growth to lift them out of
        poverty. One of the great source of political mobilisation they have is
        to look at the more developped countries for guidance. A similar concern
        is that the New Class might be too self serving in its own country,
        prioritising its needs for safety and conservatism over the needs of the
        still less affluent parts of society, slowing its transition toward a
        true post-industrial economy.
      </p>
      <p>
        Indeed between <em>The Next 200 Years</em> and{" "}
        <em>World Economic Development, 1979 And Beyond</em>, he revises his
        growth estimate for the most advanced countries down, believing that the
        impact of the anti-growth mindset is stronger and more pervasive than he
        previously anticipated.
      </p>

      <p>
        On the other hand, he also wonders how humans would actually cope with a
        society of affluence. Technological progress also enables powerful tools
        for social control, surveillance and policing. The abundance of free
        time and the lack of pressure to work hard to gain a living could lead
        to an increase in discretionary behaviour, such as hedonistic behavior,
        drug abuse, crime, etc. He also points out that the New Class could fall
        victim to what he calls learned disabilities. People living their entire
        lives inside a sheltered, engineered and comfortable reality, in a
        service oriented world centered around abstractions and personal
        relationships instead of materialistic struggles with nature may create
        a generation of highly educated but impractical and delusional people,
        who might be increasingly unable to maintain the superindustrial
        society. He points out that if the rest of the intellectual class were
        to put in practice the values expressed by the "high art" of his days
        (what he calls 'late sensate' values), it will become truly decadent and
        unable to cope with the challenges of the superindustrial society.
      </p>

      <p>
        He does spend some time grappling with the thinkers of societal cycles,
        and moral and spiritual decadence, such as Spengler, Toynbee, Sombart
        and Berdyaev, remarking how the development of the superindustrial
        society might be a step toward the kind of comfort and complacency that
        is classically associated with the conditions for the demise of great
        civilisations. He also points out that society might spontaneously
        become filled with taboos, totems, arbitrary pressure and thrill seeking
        activities whose purpose is to introduce artificial hardships where
        natural ones have been eliminated. Indeed, this society might have
        increasingly strange and seemingly irrational customs to that end.
        Boredom and nihilism might be the dominant trend of the age.
      </p>

      <figure
        style={{
          float: "right",
          margin: "0",
          padding: "1em",
          paddingBottom: "2em",
        }}
      >
        <img
          src={culturalPhasesImage}
          alt="Cultural Phases"
          style={{ maxWidth: "100%", height: "auto", display: "block" }}
        />
        <figcaption>
          Representation of the cultural phases according to various authors. We
          are in the late sensate phase.
        </figcaption>
      </figure>

      <p>
        However, he does believe that satisfactory answers to those challenges
        would likely be found, and that most people will be satisfied with the
        level of affluence that the post-industrial society offers. Indeed he
        did anticipate that american society would take a more conservative turn
        in the 1980s in part as a correction to the 1960s and 1970s. Certainly,
        his description of the post-industrial society and the New Class do seem
        to resonate in many ways with today's world.
      </p>

      <hr />

      <br />

      <h2 id="his-projections-for-our-world">
        Hit or miss? His projections for our world
      </h2>

      <p>
        The elephant in the room is the collapse of the eastern block and the
        dissolution of the Soviet Union. He did consider the possibility of
        extended economic stagnation or some political turmoil, and even the
        possibility of more autonomy for the eastern block countries, but these
        scenarios were definitely at the fringe of his thinking. However, who
        did? Who could anticipate Gorbachev, perestroika and glasnost? It is
        still fascinating to see how unthinkable this was for the time, and it
        definitely points to the difficulty of forecasting, even on the medium
        term.
      </p>
      <p>
        However, taking one step back, it is striking that the dissolution of
        the Soviet Union does not fundamentally challenge his vision of the
        future. After all, the USSR was a rather marginal and insular part of
        the world economy. In many respects, his picture of the year 2000 first
        century wasn't that far off:
      </p>

      <table>
        <tr>
          <th>Zone</th>
          <th>The year 2000 (1967)</th>
          <th>World Economic Development, 1979 And Beyond (1979)</th>
          <th>Actual year 2000</th>
        </tr>
        <tr>
          <th>World</th>
          <td>6.4 billion people, $12k per capita</td>
          <td>6 billion people, $10k per capita</td>
          <td>6.15 billion people, $9.9k per capita</td>
        </tr>
        <tr>
          <th>United States</th>
          <td>
            318 million people, $71k per capita (projected) / $48k per capita
            (using long term trend)
          </td>
          <td />
          <td>281 million people, $46k per capita</td>
        </tr>
        <tr>
          <th>Japan</th>
          <td>
            $61k per capita (projected) / $22k per capita (using long term
            trend)
          </td>
          <td />
          <td>$33k per capita</td>
        </tr>
        <tr>
          <th>France</th>
          <td>
            $49k per capita (projected) / $24k per capita (using long term
            trend)
          </td>
          <td />
          <td>$33k per capita</td>
        </tr>
        <tr>
          <th>China</th>
          <td>$2k per capita (projected and using long term trend) </td>
          <td>1.2 billion people, 4.8k per capita</td>
          <td>1.26 billion people, $4.7k per capita</td>
        </tr>
      </table>
      <figcaption>
        Various estimates for the year 2000, taken from his books and compared
        to the actual values. The estimates used are from the "most probable" or
        "World A" scenario. Dollar values converted to 2011 dollars.
      </figcaption>

      <p>
        It is notable how accurate his estimate of worldwide population and
        world gdp per capita for the year 2000 was in both 1967 and 1979.
        However, the differences between his world and our world is his forecast
        of much stronger growth of the developped countries (especially in
        1967), whereas in our world it is the developing countries that have
        carried world growth. Initially, he underestimated the growth of China,
        but then he gives a stellar estimate in 1979, reflecting a more
        optimistic attitude with the change in direction imparted by Deng
        Xiaoping. In 1967 he wildly overestimates the growth of Japan, France
        and the US (altough it is remarkable how close the US numbers were to
        his long term trend projection). At the time he had not not yet
        developped his model of slowing growth in the advanced economies, thus
        why his projection is too high. I could not find his precise projections
        for the United-States, Japan and France in 1979, but they would have
        probably been closer to the real numbers, like with China.
      </p>
      <p>
        Japan's economic performance falls short of his projections. In the
        1976, he projected that Japan would surpass the United States in GDP per
        capita around 1990. However this was not to be. To the contrary, Japan's
        economy entered a long period of stagnation in the 1990s, which is in
        part due to the unforseen fertility problems mentionned below, causing a
        decreasing workforce and increasing dependency ratio. On the other hand,
        Taiwan, South Korea, Singapore and Hong Kong have done pretty much as
        well as he predicted. He did believe strongly in the ability of what he
        called the "Neo-Confuscian" cultures to develop in some ways better than
        the original industrial nations.
      </p>

      <p>
        During his days, a big concern was the gap between the rich and poor
        countries. For him, this gap was actually a good thing, because the
        wider the gap, the easier it would be for the poorer countries to catch
        up, as the more affluent countries would have an incentive to look for
        cheap labour, and the availability of capital for development would be
        high.
      </p>

      <h3>Environmental challenges</h3>
      <p>
        He was quite right that we would be able to deal with most of the
        negative externalities of industrialisation. In his days, air quality,
        acid rains, waste or the ozone layer were seen by some as almost
        intractable problems, yet, as he predicted, we were able to aquedately
        mitigate them, and today we mostly enjoy the benefits of
        industrialisation while also having clean air, water, and a better
        preserved countryside. For example, as he predicted, we were able to
        greatly reduce particle emissions from cars thanks to catalytic
        converters and various improvements in engine design. In comparaison, at
        the time, the potential for CO2 induced global warming was seen as a
        secondary threat. I think where he alive today he would have a thing or
        two to say about some of the more destructive solutions that are pushed
        to deal with global warming, especially the pressure put on developing
        countries to sacrifice their growth in order to emit less CO2.
      </p>
      <iframe
        src="https://ourworldindata.org/grapher/emissions-of-air-pollutants?tab=chart"
        loading="lazy"
        title="Emissions of air pollutants"
        style={{ width: "100%", height: "600px", border: "0px none" }}
        allow="web-share; clipboard-write"
      />
      <p>
        However, the challenges remains very real, with the sharp decline in
        biodiversity probably being the most worrying trend, and we do have to
        limit global warming. We are still navigating the tortuous road of the
        marriage of machine and garden.
      </p>

      <h3>Ressources and energy</h3>
      <p>
        Writing around the time of the oil shocks, he did not believe that
        either minerals (he covers extensively in <em>The Next 200 Years</em>
        why all important minerals are either inexhaustible or can be
        substituted) or energy would be a serious constraint on growth. For him,
        the oil shocks were a temporary road bump caused by cartel economics. In
        fact, he believed that there was likely plenty of oil and gas to last
        for the foreseeable future. As we enter the post-industrial economy,
        additionnal growth would become less energy intensive, easing the
        potential requirements on energy ressources. In
        <em>The Next 200 Years</em>, he was already anticipating the use of
        shale oil, as well as other unconventional sources such as synthetics
        made from coal liquefaction. He estimated (citing Brobst,D.A and Pratt,
        W. P., Eds., U.S geological survey) that from shale oil alone, the
        United States could sustain 120 years of energy consumption at current
        projections. Let's have a look at these projections:
      </p>

      <table>
        <tr>
          <th>Year</th>
          <th>The Next 200 Years (1976)</th>
          <th>Actual</th>
        </tr>
        <tr>
          <th>1975</th>
          <td>73 PWh</td>
          <td>76 PWh</td>
        </tr>
        <tr>
          <th>1985</th>
          <td>103 PWh</td>
          <td>95 PWh</td>
        </tr>
        <tr>
          <th>2000</th>
          <td>176 PWh</td>
          <td>123 PWh</td>
        </tr>
        <tr>
          <th>2025</th>
          <td>351 PWh</td>
          <td>183 PWh</td>
        </tr>
      </table>
      <figcaption>
        World primary energy consumption in Petawatt-hours, taken from{" "}
        <a href="https://ourworldindata.org/grapher/global-energy-substitution">
          ourworldindata.org/grapher/global-energy-substitution
        </a>
      </figcaption>

      <p>
        We can see that he forecasted a much more energy intensive world than
        whe have had. His first projection, for 1985 is quite accurate, probably
        tempered by him taking the oil shock into account. However, after that
        he forecasted a very aggressive growth in energy consumption, which we
        just didn't see. In that way, he is quite typical of his time, since for
        the rest of the industrial revolution, strong economic growth was always
        associated with strong growth in energy consumption. This might explain
        why in our world we have twitter instead of flying cars or supersonic
        jets.
      </p>
      <p>
        Despite forseeing no immediate shortage of fossif fuels, he believed
        that what he called the "Eternal Sources" of energy would become
        competitive with fossil fuels during the early twenty first century.
        Sources such as solar, wind, geothermal, hydro, tidal, and nuclear
        breeders (or regular designs with uranium mining from seawater) or
        fusion.
      </p>

      <figure style={{ margin: "0", padding: "1em", paddingBottom: "2em" }}>
        <img
          src={eternalSourcesImage}
          alt="Kahn's World A"
          style={{ maxWidth: "60%", height: "auto", display: "block" }}
        />
        <figcaption>
          A graph showing the projected competitiveness of various eternal
          sources of energy. Impressive how spot on the photovoltaic estimate
          is.
        </figcaption>
      </figure>
      <p>
        It might be surprising that he had quite an ambivalent attitude
        regarding nuclear power. He was very sensitive to the possibility of
        nuclear proliferation, and in particular he opposed the development of
        fast breeder reactors that would have created large amounts of plutonium
        that could be easily reprocessed into bombs.
      </p>
      <h3>Work and leisure</h3>
      <p>
        He projected a continuation of the reduction in working hours, with the
        US worker working around 1600 hours per year by the year 2000. We see in
        the graph below that in fact, this trend in reduced working hours has
        been broadly followed, altough the US is somewhat of an outlier, with
        the amount of working hours per worker remaining more or less constant
        since the 1970s.
      </p>
      <iframe
        src="https://ourworldindata.org/grapher/annual-working-hours-per-worker?tab=chart"
        loading="lazy"
        title="Annual working hours per worker"
        style={{ width: "100%", height: "600px", border: "0px none" }}
        allow="web-share; clipboard-write"
      />

      <h3>Fertility</h3>
      <p>
        Another big aspect of today's world that he missed is the fertility
        collapse of advanced nation. Like many demographers of his days, he
        assumed that fertility would decrase rapidly, but somehow stabilise
        close to the replacement rate (~2.1 children per woman). Indeed, in the
        70s, it might have seemed plausible, as the sharp declines in fertility
        of Japan, the US, the Soviet Union and western europe seemed to have
        plateaued around replacement level. After all, the developed nations
        were just coming out of a "baby boom", so the decrease might be
        temporary. Thus he did not forsee that aging and even declining
        populations would be one of the biggest challenges of the twenty first
        century, and a strong incentive for replacement migration. He would
        probably be appalled by South Korea's genocide-level demographic
        collapse, and the extremely low fertility of the Neo-Confuscian
        societies in general.
      </p>
      <iframe
        src="https://ourworldindata.org/grapher/children-per-woman-un?tab=chart&time=1950..latest&country=OWID_WRL~JPN~KOR~USA~Europe+%28UN%29"
        loading="lazy"
        title="Children per woman"
        style={{ width: "100%", height: "600px", border: "0px none" }}
        allow="web-share; clipboard-write"
      />

      <p>
        In term of immigration, he did forsee the shortage of cheap labour in
        the more affluent countries. As he anticipated, this need was filled
        through extensive guest worker programs and delocalisation. However, he
        did not anticipate the large scale, long term and immobile nature of the
        migration flows that we are seeing today, especially in Europe, in part
        encouraged by low fertility.
      </p>

      <h3>A long list of innovations for the year 2000</h3>

      <p>
        In his book the Year 2000, he made a speculative list of likely
        innovations before the year 2000. Let us give him a bit more time and
        compare it with the world of today instead!
      </p>

      <details>
        <summary>Innovation that happenned</summary>
        <ul>
          <li>Wide applications for lasers</li>
          <li>New superperformance fabric</li>
          <li>New or improved materials (plastics, glasses, ceramics...)</li>
          <li>More reliable weather forecasting</li>
          <li>
            Intensive and extensive expansion of tropical agriculture and
            forestry
          </li>
          <li>
            New source of power for ground transportation (storage battery, fuel
            cell)
          </li>
          <li>
            Extensive worlwide use of high altitude camera for mapping,
            prospecting...
          </li>
          <li>
            New methods of water transportation (more extensive use of large
            automated single purpose bulk cargo ship)
          </li>
          <li>New techniques for preserving or improving the environment</li>
          <li>New and useful plant and animal species</li>
          <li>Permanent manned satellite</li>
          <li>
            More sophisticated architectural engineering (ex: geodesic domes,
            "fancy" stressed shells, pressurized skins and esoteric materials)
          </li>
          <li>3D photography, movies and television</li>
          <li>
            Extensive and intensive centralisation (or interconnection) of
            current and past personal and business information in high speed
            data processors
          </li>
          <li>
            New and pervasive techniques for surveillance, monitoring and
            control of individuals and organisations
          </li>
          <li>
            Change with the overall environment (increasing generation of CO2 in
            the atmosphere)
          </li>
          <li>
            New techniques for cheap, convenient and reliable birth control
          </li>
          <li>General and substantial increase in life expectancy</li>
          <li>High quality medical care for undeveloped areas</li>
          <li>More extensive use of transplantation of human organs</li>
          <li>
            New and improved materials and equipment for buildings and interiors
            (variable transmission glass, heating and cooling by thermoelectric
            effect, and electroluminescent and phosphorescent lighting)
          </li>
          <li>Widespread use of cryogenics</li>
          <li>Commercial extraction of oil from shale</li>
          <li>Recoverable boosters for economic space launching</li>
          <li>Simple inexpensive home recording and playing</li>
          <li>
            Inexpensive, high capacity, worldwide, regional and local
            communication (perhaps using satellites, lasers and light pipes)
          </li>
          <li>
            Practical home and business use of 'wired' video communication for
            both telephone and TV and rapid transmission and reception of
            facsimiles (instantaneous mail delivery, news, books...)
          </li>
          <li>Practical large scale desalination</li>
          <li>
            Pervasive business use of computers for the storage, processing, and
            retrieval of information
          </li>
          <li>
            Shared time (public and interconnected?) computers generally
            available to home and businesses on a metered basis
          </li>
          <li>
            Other widespread use of computers for intellectual and professional
            assistance (translation, teaching, traffic control, design and
            analysis...)
          </li>
          <li>
            Personal "pagers" (perhaps even two-way pocket phones) and other
            personal electronic equipment for communication, computing and data
            processing program
          </li>
          <li>Direct broadcast from satellites to home receivers</li>
          <li>
            Inexpensive (less than $100) long lasting, very small battery
            operated TV receivers
          </li>
          <li>
            Home computer to "run" household and communicate with outside world
          </li>
          <li>maintenance free, longlife electronic and other equipment</li>
          <li>
            Home education via video and computerized and programmed learning
          </li>
          <li>
            Inexpensive (lest than 5 cents per page) rapid high quality black
            and white reproduction, followed by color and highly detailed
            photography reproduction - perhaps for home as well as office use
          </li>
          <li>Conference TV</li>
          <li>
            Common use of individual power source for lights, applicances and
            machines
          </li>
          <li>
            New biological and chemical methods to incapacitate or annoy people
            for police and military uses
          </li>
        </ul>
      </details>
      <details>
        <summary>Innovation that arguably happenned?</summary>

        <ul>
          <li>Major reduction in hereditary and congenial defects</li>
          <li>
            Extensive use of cyborg technique (aids or substitutes for organs,
            limbs)
          </li>
          <li>New techniques and institutions for adult education</li>
          <li>
            Inexpensive design and procurement of "one of a kind" items through
            use of cumputerized analysis and automated production
          </li>
          <li>
            New or improved use of the ocean (controlled "farming", source of
            energy)
          </li>
          <li>
            Practical use of direct electronic communication with and
            stimulation of the brain
          </li>
          <li>General use of automation in management and production</li>
          <li>Human hibernation for short periods for medical purposes</li>
          <li>Automated housekeeping and home maintenance</li>
          <li>
            Cheap and widely available central war weapons and weapon systems
          </li>
          <li>
            New, more varied and reliable drugs for controlling mental and
            emotional states
          </li>
          <li>New techniques and institutions for the education of children</li>
          <li>Improved capability to change sex of children and/or adult</li>
          <li>
            Simple techniques for extensive and "permanent" cosmetological
            changes (features, figure, complexion and even skin color and even
            physique)
          </li>
          <li>
            Application of space life systems or similar techniques to
            terrestrial installations
          </li>
          <li>Automated grocery and department stores</li>
          <li>
            Automated universal (real time) credit, audit and banking system
          </li>
          <li>
            Major improvements in earth moving and construction equipment
            generally
          </li>
          <li>
            New techniques for keeping physically fit and/or acquire physical
            skills
          </li>
          <li>
            Inexpensive and reasonably effective ground based ballistic missile
            defense systems
          </li>
          <li>
            Flexible penology without necessarly using prisons (by use of modern
            methods of surveillance and control)
          </li>
          <li>Inexpensive worldwide transportation of humans and cargo</li>
          <li>Extensive genetic control for plants and animals</li>
        </ul>
      </details>

      <details>
        <summary>Innovation that didn't happen</summary>
        <ul>
          <li>New Air vehicles (vtol, supersonic jets...)</li>
          <li>
            Acceptable and competitive synthetic foods (carbohydrates, fats,
            proteins, enzumes, vitamins, tea, cocoa, alcohol liquor...)
          </li>
          <li>Relatively effective appetite and weight control</li>
          <li>Postponement of aging, and limited rejuvenation</li>
          <li>Controlled and supereffective relaxation and sleep</li>
          <li>New or improved use of the ocean (extraction of minerals)</li>
          <li>Widespread use of nuclear reactors for power</li>
          <li>
            Use of nuclear explosives for excavation, mining, source of neutrons
            or generation of power.
          </li>
          <li>Some control of weather and/or climate</li>
          <li>Capability to choose sex of unborn children</li>
          <li>
            Genetic control and influence over the basic constitution of an
            individual
          </li>
          <li>Physically non-harmfull methods of overindulging</li>
          <li>Permanent manned lunar installations</li>
          <li>Interplanetary travel</li>
          <li>
            Permanent inhabited undersea installations and perhaps even colonies
          </li>
          <li>Extensive use or robots as slave to humans</li>
          <li>
            New uses of underground tunnels for private and public
            transportation and other purposes
          </li>
          <li>Chemical methods for improving memory and learning</li>
          <li>Greater use of underground buildings</li>
          <li>
            Improved chemical control of some mental illnesses and some aspects
            of senility
          </li>
          <li>
            Inexpensive and rapid techniques for making tunnels and underground
            cavities in earth and rock
          </li>
          <li>Simulated and planned and perhaps programmed dreams</li>
          <li>General availability of inexpensive transuranics</li>
          <li>Space defense systems</li>
          <li>Very low cost builgings for home and business use</li>
          <li>Inexpensive road free (and facility free) transportation</li>
          <li>New methods for rapid language teaching</li>
          <li>
            Artificial moons and other methods for lighting large areas at night
          </li>
          <li>
            Extensive use of "biological processes" in the extraction and
            processing of minerals
          </li>
        </ul>
      </details>

      <p>
        Now, the same but with innovations that he deemed less probable, but he
        expected some of them to happen
      </p>

      <details>
        <summary>Innovations that arguably happened?</summary>
        <ul>
          <li>"True" Artificial Intelligence</li>
          <li>Automated highways</li>
          <li>
            Practical laboratory conception and nurturing of animal foetuses
          </li>
        </ul>
      </details>
      <details>
        <summary>Innovations that didn't happen</summary>
        <ul>
          <li>
            Practical use of sustained fusion to produces neutrons or energy
          </li>
          <li>Artificial growth of new limbs and organs</li>
          <li>Room temperature superconductors</li>
          <li>Major use of rocket for commercial or private transportation</li>
          <li>
            Effective chemical or biological treatment for most mental illnesses
          </li>
          <li>Almost complete control of marginal changes in heredity</li>
          <li>Practical materials with nearly "theoretical limit" strength</li>
          <li>Direct input into human memory bank</li>
          <li>
            Direct augmentation of human mental capacity by the mechanical or
            electrical interconnection of the brain with a computer
          </li>
          <li>Extensive use of moving sidewalks for local transportation</li>
          <li>Substantial manned lunar or planetary installations</li>
          <li>
            Electric power available for less than .3 mill per kilowatt hour
          </li>
          <li>Verification of some extrasensory phenomena</li>
          <li>Planetary engineering</li>
          <li>Production of a drug equivalent to Huxley's soma</li>
          <li>A technological equivalent of telepathy</li>
          <li>Some direct control of individual thought processes</li>
        </ul>
      </details>

      <p>
        I think it's quite impressive! Most of what he expected did happen, and
        most of that did happen before the year 2000. I was very impressed to
        see that he was already anticipating the commercial extraction of oil
        from shale in 1967. Some of his less likely innovations, such as true
        artificial intelligence, seems to be just around the corner today. On
        the whole, many of his projections seem quite reasonable, for example
        seeing how many computer-related innovation that he expected. But we
        have to remember that, at the time, predicting a handheld tv receiver
        wasn't necessarily more realistic than predicting a moon base or ocean
        mining. Well, for the moon base I think it's more on us than on him.
      </p>

      <hr />

      <br />

      <h2 id="conclusion">Conclusion</h2>

      <p>
        On the big picture, he was quite spot on. In particular, against many of
        the doom and gloom projections of his time, he predicted:
      </p>
      <ul>
        <li>No major wars</li>
        <li>No ressource shortage, or food shortage</li>
        <li>A richer world for almost everyone</li>
        <li>The rise of Taiwan, South Korea, Singapore and Hong Kong</li>
        <li>Guest workers, economic migration, and delocalisation</li>
        <li>
          Slowing growth of the rich countries, but strong growth of the
          middling economies
        </li>
      </ul>

      <p>
        Even where he is wrong, it gives us an interesting contrast between the
        expectations of his time, and today's reality. Most striking is how much
        less energy intensive our world ended up being. His analysis of the New
        Class and the challenges of the post-industrial society give a clear
        framing for challenges with which we are still grappling today. Looking
        at the expected innovations for the year 2000 shows that he had a really
        good grasp of the real technological trends.
      </p>
      <p>
        Thus, Hermann Kahn was able to get a lot of things right, which is quite
        impressive, especially his 1967 predictions. It is unfortunate that he
        did not live to see the rise of China, the collapse of the Soviet Union,
        and the stagnation of Japan as these events he would probably have been
        fascinated by these events. We are still riding the great transition,
        shaping the post-industrial society. Which one will we chose to build?
      </p>

      <hr />

      <br />

      <h2 id="post-conclusion">Post-Conclusion: What about Space?</h2>

      <p>
        In this age of abundance and leisure, Herman Kahn talks of those whose
        appetite for adventure and exploration is not satiated by the safety and
        relative stagnation of the post-industrial society. Enterprising people
        who actively seek out challenge and difficult situations. He speculates
        that for them the post-industrial society would be a dull and
        unfulfilling existence, no matter how pleasant it might be. Space
        exploration might become the outlet for these kind of individuals. He
        does believe in the commercial potential of space, however he thinks
        that space exploration will largely be done for its own sake, and for
        the sake of larger ideals, such as the expansion and preservation of the
        human race, life, and ideological or religious reasons.
      </p>

      <p>
        If space exploration were to take a serious turn, it is hard to speak of
        limits to growth. As long as man explores space, there seem to be no
        need for proximate limits for the scale of the human enterprise. Indeed
        the entire galaxy isn't out of reach.
      </p>

      <p>
        Thus, the super-industrial / post-industrial society need not be the end
        point of human development, but to the contrary, provide the staging
        ground, the opulent industrial base from which humanity can muster the
        resources to launch itself into the stars. In the future, we might look
        back and see in the post-industrial society not an end, but the true
        beginning of our story.
      </p>
      <footer
        style={{
          marginTop: "2em",
          borderTop: "1px solid #ccc",
          paddingTop: "1em",
          fontSize: "0.9em",
          color: "#666",
        }}
      >
        <p>
          This page is based on the-monospace-web template created by{" "}
          <a
            href="https://wickstrom.tech"
            target="_blank"
            rel="noopener noreferrer"
          >
            Oskar Wickström
          </a>{" "}
          <a
            href="https://github.com/owickstrom/the-monospace-web"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://github.com/owickstrom/the-monospace-web
          </a>
          .
        </p>
      </footer>
    </>
  );
};

export default PostIndustrialSociety;
