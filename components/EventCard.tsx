import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useBounceStore } from '../lib/store';
import * as Haptics from 'expo-haptics';
import { Event } from '../lib/mockData';

interface EventCardProps { event: Event; onPress?: () => void; compact?: boolean; testID?: string; }

export default function EventCard({ event, onPress, compact = false, testID }: EventCardProps) {
  const { likedEvents, toggleLikeEvent } = useBounceStore();
  const isLiked = likedEvents.includes(event.id);
  const handleLike = () => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); toggleLikeEvent(event.id); };
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9} testID={testID || `event-card-${event.id}`} className="mb-4 rounded-2xl overflow-hidden bg-[#130D24] border border-white/10">
      <View className="relative">
        <Image source={{ uri: event.image }} className={compact ? "w-full h-28" : "w-full h-40"} resizeMode="cover" />
        <LinearGradient colors={['transparent', 'rgba(8,5,15,0.85)']} className="absolute bottom-0 left-0 right-0 h-20" />
        <View className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60"><Text className="text-white text-xs font-medium">{event.category}</Text></View>
        <View className={`absolute top-3 right-3 px-3 py-1 rounded-full ${event.free ? 'bg-[#00F5D4]' : 'bg-[#FF6B00]'}`}><Text className="text-[#08050F] text-xs font-bold">{event.free ? 'FREE' : event.price || 'PAID'}</Text></View>
        <TouchableOpacity onPress={handleLike} className="absolute bottom-3 right-3 p-2" testID={`like-event-${event.id}`}><Ionicons name={isLiked ? "heart" : "heart-outline"} size={22} color={isLiked ? "#FF1E6C" : "#FFFFFF"} /></TouchableOpacity>
      </View>
      <View className="p-4">
        <Text className="text-white text-lg font-semibold mb-1" numberOfLines={2}>{event.title}</Text>
        <Text className="text-[#8B7AAE] text-sm mb-2">{event.organizer}</Text>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center"><Ionicons name="calendar-outline" size={14} color="#8B7AAE" /><Text className="text-[#8B7AAE] text-xs ml-1.5">{event.date} • {event.time}</Text></View>
          <View className="flex-row items-center"><Ionicons name="star" size={14} color="#FFE500" /><Text className="text-white text-xs ml-1 font-medium">{event.rating}</Text><Text className="text-[#8B7AAE] text-xs ml-2">• {event.attendees} going</Text></View>
        </View>
        <View className="flex-row items-center mt-2"><Ionicons name="location-outline" size={14} color="#00F5D4" /><Text className="text-[#00F5D4] text-xs ml-1.5 flex-1" numberOfLines={1}>{event.location}</Text></View>
      </View>
    </TouchableOpacity>
  );
}