export interface Welcome {
    data: Data;
    status: number;
}

export interface Data {
    unified: Unified[];
    metrics: Metrics;
    byPlatform: ByPlatform;
}

export interface ByPlatform {
    instagram: Instagram;
    facebook: Facebook;
    tiktok: Tiktok;
    youtube: Youtube;
    twitter: Twitter;
}

export interface Facebook {
    facebookUrl: string;
    categories: string[];
    info: string[];
    likes: number;
    messenger: null;
    title: string;
    address: string;
    pageId: string;
    pageName: string;
    pageUrl: string;
    intro: string;
    websites: string[];
    email: string;
    website: string;
    followers: number;
    profilePictureUrl: string;
    coverPhotoUrl: string;
    profilePhoto: string;
    creation_date: string;
    ad_status: string;
    about_me: AboutMe;
    facebookId: string;
    pageAdLibrary: PageAdLibrary;
}

export interface AboutMe {
    text: string;
    urls: string[];
}

export interface PageAdLibrary {
    is_business_page_active: boolean;
    id: string;
}

export interface Instagram {
    inputUrl: string;
    id: string;
    username: string;
    url: string;
    fullName: string;
    biography: string;
    externalUrls: ExternalURL[];
    externalUrl: string;
    externalUrlShimmed: string;
    followersCount: number;
    followsCount: number;
    hasChannel: boolean;
    highlightReelCount: number;
    isBusinessAccount: boolean;
    joinedRecently: boolean;
    businessCategoryName: string;
    private: boolean;
    verified: boolean;
    profilePicUrl: string;
    profilePicUrlHD: string;
    igtvVideoCount: number;
    relatedProfiles: RelatedProfile[];
    latestIgtvVideos: Latest[];
    postsCount: number;
    latestPosts: Latest[];
    fbid: string;
}

export interface ExternalURL {
    title: string;
    lynx_url: string;
    url: string;
    link_type: string;
}

export interface Latest {
    type: string;
    shortCode: string;
    title?: string;
    caption: string;
    commentsCount: number;
    commentsDisabled?: boolean;
    dimensionsHeight: number;
    dimensionsWidth: number;
    displayUrl: string;
    likesCount: number;
    videoDuration?: number;
    videoViewCount?: number;
    id: string;
    hashtags: string[];
    mentions: string[];
    url: string;
    firstComment?: string;
    latestComments?: any[];
    images: string[];
    videoUrl?: string;
    alt: null | string;
    timestamp: Date;
    childPosts: ChildPost[];
    ownerUsername: string;
    ownerId: string;
    productType?: string;
    isCommentsDisabled: boolean;
    musicInfo?: MusicInfo;
    taggedUsers?: RelatedProfile[];
    locationName?: string;
    locationId?: string;
}

export interface ChildPost {
    id: string;
    type: string;
    shortCode: string;
    caption: string;
    hashtags: any[];
    mentions: any[];
    url: string;
    commentsCount: number;
    firstComment: string;
    latestComments: any[];
    dimensionsHeight: number;
    dimensionsWidth: number;
    displayUrl: string;
    images: any[];
    alt: string;
    likesCount: null;
    timestamp: null;
    childPosts: any[];
    ownerUsername: string;
    ownerId: string;
    taggedUsers?: RelatedProfile[];
}


export interface RelatedProfile {
    full_name: string;
    id: string;
    is_verified: boolean;
    profile_pic_url: string;
    username: string;
    is_private?: boolean;
}

export interface MusicInfo {
    artist_name: string;
    song_name: string;
    uses_original_audio: boolean;
    should_mute_audio: boolean;
    should_mute_audio_reason: string;
    audio_id: string;
}

export type ProductType = {
    Clips: "clips",
    Igtv: "igtv",
}

export interface Tiktok {
    id: string;
    url: string;
    username: string;
    nickname: string;
    bio: string;
    bioUrl: null;
    followers: number;
    following: number;
    likes: number;
    videos: number;
    verified: boolean;
    profileCategory: string;
    avatar: string;
}

export interface Twitter {
    userName: string;
    name: string;
    description: string;
    followers: number;
    following: number;
    tweetsCount: number;
    createdAt: string;
    isVerified: boolean;
    profilePicture: string;
    coverPicture: string;
    profileUrl: string;
}

export interface Youtube {
    channelName: string;
    channelDescription: string;
    channelUrl: string;
    channelAvatarUrl: string;
    channelBannerUrl: string;
    subscribersCount: number;
    totalViews: number;
    totalVideos: number;
    isVerified: boolean;
    joinDate: string;
    socialLinks: any[];
}

export interface Metrics {
    totalFollowers: number;
    totalLikes: number;
    totalPosts: number;
    totalFollowing: number;
    verifiedAccounts: number;
    platformsCount: number;
    averageEngagement: number;
}

export interface Unified {
    platform: string;
    username: string;
    displayName: string;
    description: string;
    followers: number;
    following: number;
    posts: number;
    likes: number;
    verified: boolean;
    profilePicture: string;
    profileUrl?: string;
    additionalInfo: AdditionalInfo;
}

export interface AdditionalInfo {
    businessAccount?: boolean;
    businessCategory?: string;
    externalUrl?: string;
    email?: string;
    website?: string;
    categories?: string[];
    creationDate?: string;
    totalViews?: number;
    joinDate?: string;
    socialLinks?: any[];
    createdAt?: string;
    coverPicture?: string;
}


export interface MetricsCardsProps {
    metrics: {
        totalFollowers: number;
        totalLikes: number;
        totalPosts: number;
        totalFollowing: number;
        verifiedAccounts: number;
        platformsCount: number;
        averageEngagement: number;
    };
}
