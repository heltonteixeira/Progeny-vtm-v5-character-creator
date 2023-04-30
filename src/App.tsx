import { AppShell, BackgroundImage, Container, Header, Navbar } from '@mantine/core';
import { useLocalStorage, useMediaQuery } from '@mantine/hooks';
import { useState } from "react";
import './App.css';
import { Character, getEmptyCharacter } from "./data/Character";
import Generator from './generator/Generator';
import AsideBar from './sidebar/AsideBar';
import Sidebar from './sidebar/Sidebar';
import Topbar from './topbar/Topbar';

import club from './resources/backgrounds/aleksandr-popov-3InMDrsuYrk-unsplash.jpg';
import brokenDoor from './resources/backgrounds/amber-kipp-VcPo_DvKjQE-unsplash.jpg';
import city from './resources/backgrounds/dominik-hofbauer-IculuMoubkQ-unsplash.jpg';
import bloodGuy from './resources/backgrounds/marcus-bellamy-xvW725b6LQk-unsplash.jpg';
import batWoman from './resources/backgrounds/peter-scherbatykh-VzQWVqHOCaE-unsplash.jpg';
import alley from './resources/backgrounds/thomas-le-KNQEvvCGoew-unsplash.jpg';
import { rndInt } from './generator/utils';

const backgrounds = [club, brokenDoor, city, bloodGuy, batWoman, alley]

function App() {
  const phoneSizedScreen = useMediaQuery('(max-width: 550px)')
  const [character, setCharacter] = useLocalStorage<Character>({ key: "character", defaultValue: getEmptyCharacter() })
  const [selectedStep, setSelectedStep] = useLocalStorage({ key: "selectedStep", defaultValue: 0 })
  const [backgroundIndex, setBackgroundIndex] = useState(rndInt(0, backgrounds.length))

  const [fillableCharacterSheet, setFillableCharacterSheet] = useLocalStorage<string | null>({ key: "characterSheet", defaultValue: null })

  return (
    <AppShell
      padding="md"
      navbar={phoneSizedScreen ? <></> : <Navbar width={{ base: 300 }} height={"100%"} p="xs">{<Sidebar character={character} />}</Navbar>}
      header={<Header height={60} p="xs"><Topbar character={character} setCharacter={setCharacter} setSelectedStep={setSelectedStep} /></Header>}
      aside={<AsideBar selectedStep={selectedStep} setSelectedStep={setSelectedStep} character={character} />}
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
    >
      {
        <BackgroundImage h={"99%"} src={backgrounds[backgroundIndex]}>
          <div style={{ backgroundColor: "rgba(0, 0, 0, 0.7)", height: "100%" }}>
            <Container h={"100%"}>
              <Generator character={character} setCharacter={setCharacter} selectedStep={selectedStep} setSelectedStep={setSelectedStep} fillableCharacterSheet={fillableCharacterSheet} setFillableCharacterSheet={setFillableCharacterSheet} />
            </Container >
          </div>
        </BackgroundImage>
      }
    </AppShell>
  );
}

export default App;
