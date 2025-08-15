export interface InstagramPost {
    id: string;
    shortCode: string;
    type: 'Image' | 'Sidecar' | 'Video';
    caption: string;
    url: string;
    commentsCount: number;
    likesCount: number;
    timestamp: Date;
    ownerUsername: string;
    comments: Comment[];
}

export interface Comment {
    id?: string;
    postUrl?: string;
    commentUrl?: string;
    text?: string;
    ownerUsername?: string;
    timestamp?: Date;
    likesCount?: number;
    owner?: Owner;
}

export interface Owner {
    fbid_v2?: string;
    full_name?: string;
    id?: string;
    is_mentionable?: boolean;
    is_private?: boolean;
    is_verified?: boolean;
    profile_pic_id?: string;
    profile_pic_url?: string;
    username?: string;
    latest_reel_media?: number;
}

