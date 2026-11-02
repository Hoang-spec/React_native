import { Alert, SafeAreaView, ScrollView, StatusBar, Switch, TextInput, TouchableOpacity, View } from 'react-native';
import { Label, Button, Field, Logo, Poster, AvatarStack, EventCard, TopBar, BottomNav, SectionTitle, AuthSocial, EmptyState, C, events, categories, styles } from '../components';

export function AuthScreen({mode, go, remember, setRemember}) {
    const isLogin = mode === 'Sign in';
    const isSignup = mode === 'Sign up';
    return <SafeAreaView style={styles.safe}><StatusBar barStyle="dark-content" /><View style={styles.authBackground}><View style={styles.glowA} /><View style={styles.glowB} />
      <ScrollView contentContainerStyle={styles.authContent} keyboardShouldPersistTaps="handled">
        <TouchableOpacity onPress={() => go('Onboarding 3')} style={styles.authLogo}><Logo size={58} /><Label style={styles.brand}>EventHub</Label></TouchableOpacity>
        <Label style={styles.authHeading}>{mode}</Label>
        <Field icon="✉" placeholder="abc@email.com" />
        {isSignup ? <><Field icon="♙" placeholder="Full name" /><Field icon="☎" placeholder="Phone number" /></> : null}
        <Field icon="♙" placeholder="Your password" secureTextEntry right={{ label: '◉' }} />
        {isSignup ? <Field icon="♙" placeholder="Confirm password" secureTextEntry /> : null}
        {isLogin ? <View style={styles.rememberRow}><TouchableOpacity style={styles.rememberChoice} onPress={() => setRemember(!remember)}><View style={[styles.toggleTrack, remember && styles.toggleOn]}><View style={[styles.toggleDot, remember && styles.toggleDotOn]} /></View><Label style={styles.rememberText}>Remember Me</Label></TouchableOpacity><TouchableOpacity onPress={() => go('Resset Password')}><Label style={styles.forgot}>Forgot Password?</Label></TouchableOpacity></View> : null}
        <Button title={isLogin ? 'SIGN IN                 ➜' : 'SIGN UP                 ➜'} onPress={() => isLogin ? go('Home') : go('Verification')} style={styles.authSubmit} />
        {isLogin ? <AuthSocial go={go} /> : null}
        <TouchableOpacity style={styles.authSwitch} onPress={() => go(isLogin ? 'Sign up' : 'Sign in')}><Label>{isLogin ? 'Don’t have an account?  ' : 'Already have an account?  '}<Label style={{ color: C.blue }}>{isLogin ? 'Sign up' : 'Sign in'}</Label></Label></TouchableOpacity>
      </ScrollView></View></SafeAreaView>;
}

export function OnboardingScreen({index, go, setOnboard}) {
    const titles = ['Explore Upcoming and Nearby Events', 'We Have Modern Events Calendar Feature', 'To Look Up More Events or Activities Nearby by Location'];
    const descriptions = ['In publishing and graphic design, Lorem is a placeholder text commonly used to demonstrate the visual form of a document.', 'Choose your favorite events, save the dates and keep all your plans in one place.', 'Explore events around you and find the best activities on the map.'];
    return <SafeAreaView style={styles.safe}><StatusBar barStyle="dark-content" /><View style={styles.onboardScreen}>
      <View style={styles.phoneStage}><View style={styles.phoneShadow}><View style={styles.phone}><View style={styles.miniHeader}><Label style={styles.miniMenu}>☰</Label><View><Label style={styles.miniLocation}>Current Location⌄</Label><Label style={styles.miniCity}>New York, USA</Label></View><Label style={styles.miniBell}>♧</Label></View><View style={styles.miniSearch}><Label style={{ color: '#B4B7D4' }}>⌕  Search...</Label><Label style={styles.miniFilter}>☷ Filters</Label></View><View style={styles.categoryRow}>{categories.slice(0, 3).map(c => <View key={c.name} style={[styles.categoryPill, { backgroundColor: c.color }]}><Label style={styles.categoryText}>{c.icon}  {c.name}</Label></View>)}</View><View style={styles.miniSection}><Label style={styles.miniSectionTitle}>Upcoming Events</Label><Label style={styles.miniSeeAll}>See All ›</Label></View><View style={styles.miniCards}>{events.slice(0, 2).map((e, i) => <View key={i} style={styles.miniCard}><Poster event={e} /><Label style={styles.miniCardTitle} numberOfLines={2}>{e.title}</Label><Label style={styles.miniPeople}>👩🏻 👨🏽  +20 Going</Label></View>)}</View><Label style={styles.miniNearby}>Nearby You                         See All ›</Label><View style={styles.miniNearbyCard}><Poster event={events[2]} /><Label style={styles.miniNearbyCopy}>International Gala Music Festival</Label></View></View></View></View>
      <View style={styles.onboardBottom}><Label style={styles.onboardTitle}>{titles[index - 1]}</Label><Label style={styles.onboardDesc}>{descriptions[index - 1]}</Label><View style={styles.onboardControls}><TouchableOpacity onPress={() => go('Sign in')}><Label style={styles.skip}>Skip</Label></TouchableOpacity><View style={styles.dots}>{[1, 2, 3].map(i => <View key={i} style={[styles.dot, index === i && styles.dotActive]} />)}</View><TouchableOpacity onPress={() => index < 3 ? (setOnboard(index + 1), go(`Onboarding ${index + 1}`)) : go('Sign in')}><Label style={styles.next}>Next</Label></TouchableOpacity></View></View>
    </View></SafeAreaView>;
}

export function ResetScreen({go}) {
  return <SafeAreaView style={styles.safe}><TopBar title="Reset Password" onBack={() => go('Sign in')} /><View style={styles.simplePage}><View style={styles.simpleIllustration}><Label style={{fontSize:54}}>🔐</Label></View><Label style={styles.simpleTitle}>Reset Password</Label><Label style={styles.simpleText}>Please enter your email address to request a password reset.</Label><Field icon="✉" placeholder="abc@email.com" /><Button title="SEND  ➜" onPress={()=>go('Verification')} style={{marginTop:18}} /></View></SafeAreaView>;
}

export function VerifyScreen({go}) {
  return <SafeAreaView style={styles.safe}><TopBar title="Verification" onBack={() => go('Sign up')} /><View style={styles.simplePage}><View style={styles.simpleIllustration}><Label style={{fontSize:56}}>✉️</Label></View><Label style={styles.simpleTitle}>Verification</Label><Label style={styles.simpleText}>We’ve sent you the verification code to your email address.</Label><View style={styles.codeRow}>{[1,2,3,4].map((n)=><TextInput key={n} keyboardType="number-pad" maxLength={1} defaultValue={n<3?String(n+2):''} style={styles.codeBox} />)}</View><Button title="CONTINUE  ➜" onPress={()=>go('Home')} style={{marginTop:24}} /><TouchableOpacity style={{marginTop:18}} onPress={()=>Alert.alert('Code sent','A new verification code has been sent.')}><Label style={styles.detailInfoSub}>Resend code in 0:20</Label></TouchableOpacity></View></SafeAreaView>;
}
