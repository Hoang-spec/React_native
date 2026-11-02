import React, { useEffect, useMemo, useState } from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import { C, events, styles, Logo, Label } from './components';
import {
  AuthScreen, OnboardingScreen, HomeScreen, SearchScreen, DetailsScreen,
  MenuScreen, EventsScreen, FilterScreen, MapScreen, ProfileScreen,
  NotificationsScreen, InviteScreen, ShareScreen, ResetScreen, VerifyScreen, EmptyScreen,
} from './screens';

function App() {
  const [screen, setScreen] = useState('Splash Screen');
  const [onboard, setOnboard] = useState(1);
  const [tab, setTab] = useState('Home');
  const [filter, setFilter] = useState('Upcoming');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [saved, setSaved] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(events[0]);
  const [remember, setRemember] = useState(true);
  const [notificationsCleared, setNotificationsCleared] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setScreen('Onboarding 1'), 1100);
    return () => clearTimeout(timer);
  }, []);

  const go = (name) => {
    if (name === 'Event Details') setSelectedEvent(events[0]);
    setScreen(name);
    if (['Home', 'Search- White Bar', 'My Profile'].includes(name)) setTab(name === 'Home' ? 'Home' : name === 'Search- White Bar' ? 'Explore' : 'Profile');
  };
  const openEvent = (event) => { setSelectedEvent(event); go('Event Details'); };
  const filteredEvents = useMemo(() => events.filter(e => (selectedCategory === 'All' || e.tag === selectedCategory) && e.title.toLowerCase().includes(search.toLowerCase())), [selectedCategory, search]);

  const screenProps = {
    go, openEvent, onboard, setOnboard, selectedCategory, setSelectedCategory,
    saved, setSaved, search, setSearch, filteredEvents, selectedEvent,
    remember, setRemember, filter, setFilter, notificationsCleared,
    setNotificationsCleared,
  };

  if (screen === 'Splash Screen') return <SafeAreaView style={styles.safe}><StatusBar barStyle="dark-content" /><View style={styles.splash}><Logo size={74} /><Label style={styles.splashBrand}>EventHub</Label></View></SafeAreaView>;
  if (screen.startsWith('Onboarding')) return <OnboardingScreen {...screenProps} index={Number(screen.slice(-1)) || onboard} />;
  if (screen === 'Sign in' || screen === 'Sign up') return <AuthScreen {...screenProps} mode={screen} />;
  if (screen === 'Resset Password') return <ResetScreen {...screenProps} />;
  if (screen === 'Verification') return <VerifyScreen {...screenProps} />;
  if (screen === 'Home') return <HomeScreen {...screenProps} />;
  if (screen === 'Search- White Bar') return <SearchScreen {...screenProps} />;
  if (screen === 'Event Details') return <DetailsScreen {...screenProps} />;
  if (screen === 'Menu White') return <MenuScreen {...screenProps} />;
  if (screen === 'Filter') return <FilterScreen {...screenProps} />;
  if (screen === 'Map View') return <MapScreen {...screenProps} />;
  if (screen === 'See All Events') return <EventsScreen {...screenProps} title="Events" />;
  if (screen === 'Empty Events') return <EmptyScreen {...screenProps} title="No Upcoming Event" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit." action="EXPLORE EVENTS" onPress={() => { setSelectedCategory('All'); go('Home'); }} />;
  if (screen === 'My Profile' || screen.startsWith('Organizer')) return <ProfileScreen {...screenProps} kind={screen} />;
  if (screen === 'Notification') return <NotificationsScreen {...screenProps} />;
  if (screen === 'Empty Notification') return <NotificationsScreen {...screenProps} empty />;
  if (screen === 'Invite Friend v1') return <InviteScreen {...screenProps} />;
  if (screen === 'Share') return <ShareScreen {...screenProps} />;
  return <HomeScreen {...screenProps} />;
}

export default App;
