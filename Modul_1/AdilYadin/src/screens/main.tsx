import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

import SummaryCard from '../components/SummaryCard';
import TrailCard from '../components/TrailCard';
import TimelineConnector from '../components/TimelineConnector';
import TransportPill from '../components/TransportPill';
import BottomNav from '../components/BottomNav';

export default function Main() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.logoIcon}>
            <Ionicons name="location" size={16} color="white" />
          </View>
          <Text style={styles.logoText}>PathLog</Text>
          <View style={styles.activeBadge}>
            <View style={styles.activeDot} />
            <Text style={styles.activeBadgeText}>Tracking Active</Text>
          </View>
        </View>
        <View style={styles.avatarPlaceholder}>
          <Ionicons name="person" size={16} color="#aaa" />
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.calendarHeader}>
          <View style={styles.monthSelector}>
            <Text style={styles.monthText}>October 2024</Text>
            <Ionicons name="chevron-down" size={16} color="#000" />
          </View>
          <View style={styles.todayBtn}>
            <Text style={styles.todayBtnText}>Today</Text>
          </View>
        </View>

        <View style={styles.calendarStrip}>
          {['M\n21', 'T\n22', 'W\n23'].map((txt, i) => (
            <View key={i} style={styles.calDay}>
              <Text style={styles.calDayText}>{txt}</Text>
              <View style={[styles.calDot, {backgroundColor: '#48db8b'}]} />
            </View>
          ))}
          <View style={[styles.calDay, styles.calDayActive]}>
            <Text style={[styles.calDayText, {color: '#fff'}]}>THU{'\n'}24</Text>
            <View style={[styles.calDot, {backgroundColor: '#48db8b'}]} />
          </View>
          {['F\n25', 'S\n26', 'S\n27'].map((txt, i) => (
            <View key={i} style={styles.calDay}>
              <Text style={styles.calDayText}>{txt}</Text>
              <View style={styles.calDot} />
            </View>
          ))}
        </View>

        <SummaryCard />

        <View style={styles.mapCard}>
          <View style={styles.mapBadge}>
            <View style={styles.activeDot} />
            <Text style={styles.mapBadgeText}>Live GPS  98%</Text>
          </View>
          <View style={styles.expandBtn}>
            <Text style={styles.expandText}>Expand Map</Text>
            <Ionicons name="expand-outline" size={12} color="#fff" style={{marginLeft: 4}} />
          </View>
          <View style={styles.mockRouteLine} />
        </View>

        <View style={styles.trailHeader}>
          <Ionicons name="git-merge-outline" size={20} color="#000" style={{ transform: [{rotate: '180deg'}] }} />
          <Text style={styles.trailTitle}>Chronological Trail</Text>
          <View style={styles.logBadge}>
            <Text style={styles.logBadgeText}>4 Logs Recorded</Text>
          </View>
        </View>

        <View style={styles.timelineWrapper}>
          
          <View style={styles.timelineRow}>
            <TimelineConnector icon="home" color="#1c1b3b" />
            <View style={styles.cardWrapper}>
              <TrailCard 
                time="08:00 AM" 
                tag="Origin"
                title="Sweet Home (Downtown)"
                description="Left at 08:00 AM • Ready for commute"
              />
            </View>
          </View>

          <TransportPill 
            icon="walk" 
            text="Walking • 15 mins • 0.9 km • 1,210 steps" 
            color="#059669" 
            backgroundColor="#d1fae5" 
          />

          <View style={styles.timelineRow}>
            <TimelineConnector icon="cafe" color="#b45309" />
            <View style={styles.cardWrapper}>
              <TrailCard 
                time="08:15 AM – 11:30 AM" 
                duration="3h 15m"
                tag="Cafe"
                tagColor="#b45309"
                tagIcon="cafe"
                title="Kopi Kenangan"
                description="Morning coffee & design sprint notes with Sarah. Finalized user journeys."
                image={true}
              />
            </View>
          </View>

          <TransportPill 
            icon="car" 
            text="Driving • 22 mins • 6.8 km • Avg 35 km/h" 
          />

          <View style={styles.timelineRow}>
            <TimelineConnector icon="business" color="#1c1b3b" />
            <View style={styles.cardWrapper}>
              <TrailCard 
                time="11:52 AM – 03:40 PM" 
                duration="3h 48m"
                tag="Office & Studio"
                tagColor="#1c1b3b"
                tagIcon="desktop-outline"
                title="The Collective Studio"
                description="Product launch sync meeting. Reviewed final mobile interaction..."
                image={true}
              />
            </View>
          </View>

          <TransportPill 
            icon="train" 
            text="Transit • 18 mins • 4.7 km" 
          />

          <View style={styles.timelineRow}>
            <TimelineConnector icon="leaf" color="#059669" isLast={true} />
            <View style={styles.cardWrapper}>
              <TrailCard 
                time="03:58 PM – 05:10 PM" 
                duration="1h 12m stay"
                tag="Park"
                tagColor="#059669"
                tagIcon="leaf"
                title="Riverside Botanical Park"
                description="Evening mental recharge stroll. Calming breeze by the river bend after..."
                image={true}
              />
            </View>
          </View>

        </View>

      </ScrollView>

      <View style={styles.fabContainer}>
        <Pressable style={styles.fabBtn}>
          <Ionicons name="location-outline" size={20} color="#fff" />
          <Text style={styles.fabText}>Add Manual Stop</Text>
        </Pressable>
        <Pressable style={styles.fabFilter}>
          <Ionicons name="options-outline" size={20} color="#000" />
        </Pressable>
      </View>

      <BottomNav />
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fcfcfd' },
  header: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 12 },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  logoIcon: { width: 28, height: 28, borderRadius: 8, backgroundColor: '#4338ca', justifyContent: 'center', alignItems: 'center', marginRight: 8 },
  logoText: { fontSize: 18, fontWeight: 'bold', marginRight: 12 },
  activeBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#a7f3d0', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  activeDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#059669', marginRight: 4 },
  activeBadgeText: { fontSize: 11, fontWeight: '600', color: '#065f46' },
  avatarPlaceholder: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#e2e8f0', justifyContent: 'center', alignItems: 'center' },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 100 },
  calendarHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, marginBottom: 16 },
  monthSelector: { flexDirection: 'row', alignItems: 'center' },
  monthText: { fontSize: 18, fontWeight: '600', marginRight: 4 },
  todayBtn: { backgroundColor: '#f1f5f9', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 },
  todayBtnText: { fontSize: 13, fontWeight: '600', color: '#334155' },
  calendarStrip: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  calDay: { width: 42, height: 64, borderRadius: 21, backgroundColor: '#f8fafc', justifyContent: 'center', alignItems: 'center' },
  calDayActive: { backgroundColor: '#1e1b4b' },
  calDayText: { textAlign: 'center', fontSize: 14, fontWeight: '600', color: '#64748b', lineHeight: 20, marginBottom: 4 },
  calDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: '#cbd5e1' },
  mapCard: { height: 140, backgroundColor: '#e2e8f0', borderRadius: 20, marginBottom: 24, padding: 12, overflow: 'hidden' },
  mapBadge: { position: 'absolute', top: 12, left: 12, flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 16 },
  mapBadgeText: { fontSize: 12, fontWeight: '600', color: '#000' },
  expandBtn: { position: 'absolute', top: 12, right: 12, flexDirection: 'row', alignItems: 'center', backgroundColor: '#1e1b4b', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 16 },
  expandText: { fontSize: 12, fontWeight: '600', color: '#fff' },
  mockRouteLine: { position: 'absolute', top: '50%', left: 20, right: 20, height: 4, backgroundColor: '#059669', transform: [{rotate: '15deg'}] },
  trailHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  trailTitle: { fontSize: 18, fontWeight: 'bold', marginLeft: 8, flex: 1 },
  logBadge: { backgroundColor: '#6ee7b7', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  logBadgeText: { fontSize: 12, fontWeight: '600', color: '#064e3b' },
  timelineWrapper: { paddingLeft: 4 },
  timelineRow: { flexDirection: 'row' },
  cardWrapper: { flex: 1, marginTop: 12 },
  fabContainer: { position: 'absolute', bottom: 84, left: 20, right: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  fabBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1e1b4b', paddingHorizontal: 24, paddingVertical: 14, borderRadius: 28, elevation: 5, shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.25, shadowRadius: 3.84 },
  fabText: { color: '#fff', fontSize: 15, fontWeight: '600', marginLeft: 8 },
  fabFilter: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#f1f5f9', justifyContent: 'center', alignItems: 'center', marginLeft: 12 },
});
