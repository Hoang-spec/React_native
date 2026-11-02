# EventHub React Native

Expo starter that recreates the 24 visible EventHub screens as a navigable mobile UI.

## Run

```bash
npm install
npx expo start
```

Press `w` to open Expo Web, or scan the QR code with Expo Go on a phone.

## Code structure

- `App.js` manages app state and routes to the active screen.
- `components.js` contains shared data, styles, and reusable UI components.
- `screens/` groups screen components by authentication, events, and account features.

## Screens included

Splash, three onboarding screens, sign in, sign up, verification, reset password, home, event details, map view, search, event list, empty events, filter, menu, profile, organizer about/events/reviews, notifications and empty notifications, invite friends, and share.

The Figma file’s temporary asset export endpoints were inaccessible from this workspace. Event posters and small illustrations are represented with editable React Native shapes and emoji placeholders so the application runs without external asset URLs.
