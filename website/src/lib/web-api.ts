import type {
  AuthLoginRequest,
  AuthSession,
  AuthSessionRequest,
  AuthSessionResult,
  GamesFetchRequest,
  CatalogBrowseRequest,
  ResolveLaunchIdRequest,
  RegionsFetchRequest,
  MainToRendererSignalingEvent,
  OpenNowApi,
  SavedAccount,
  SessionAdReportRequest,
  SessionCreateRequest,
  SessionPollRequest,
  SessionStopRequest,
  SessionClaimRequest,
  SignalingConnectRequest,
  SendAnswerRequest,
  IceCandidatePayload,
  KeyframeRequest,
  Settings,
  SubscriptionFetchRequest,
  StreamRegion,
  ScreenshotSaveRequest,
  ScreenshotDeleteRequest,
  ScreenshotSaveAsRequest,
  ScreenshotEntry,
  ScreenshotSaveAsResult,
  RecordingBeginRequest,
  RecordingBeginResult,
  RecordingChunkRequest,
  RecordingFinishRequest,
  RecordingAbortRequest,
  RecordingEntry,
  RecordingDeleteRequest,
  MediaListingResult,
  PrintedWasteQueueData,
  PrintedWasteServerMapping,
  ThankYouDataResult,
  AppUpdaterState,
  SessionConflictChoice,
  LoginProvider,
  SubscriptionInfo,
  GameInfo,
  CatalogBrowseResult,
  SessionInfo,
  ActiveSessionInfo,
  PingResult,
  VideoCodec,
  ColorQuality,
} from "@shared/gfn";
import { DEFAULT_STREAM_PREFERENCES } from "@shared/gfn";

const STORAGE_KEY_PREFIX = "opennow_web_";
const SETTINGS_KEY = `${STORAGE_KEY_PREFIX}settings`;
const ACCOUNTS_KEY = `${STORAGE_KEY_PREFIX}accounts`;
const SESSION_KEY = `${STORAGE_KEY_PREFIX}session`;
const SCREENSHOTS_KEY = `${STORAGE_KEY_PREFIX}screenshots`;
const RECORDINGS_KEY = `${STORAGE_KEY_PREFIX}recordings`;

function storageGet<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw) as T;
  } catch {}
  return fallback;
}

function storageSet<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

const mockProviders: LoginProvider[] = [
  {
    idpId: "nvidia-web",
    code: "NVIDIA",
    displayName: "NVIDIA Account",
    streamingServiceUrl: "https://www.nvidia.com",
    priority: 1,
  },
  {
    idpId: "nvidia-staging",
    code: "NVIDIA_STAGING",
    displayName: "NVIDIA Staging",
    streamingServiceUrl: "https://staging.nvidia.com",
    priority: 2,
  },
];

const defaultSettings: Settings = {
  resolution: "1920x1080",
  aspectRatio: "16:9",
  posterSizeScale: 1,
  fps: 60,
  maxBitrateMbps: 75,
  codec: DEFAULT_STREAM_PREFERENCES.codec,
  decoderPreference: "auto",
  encoderPreference: "auto",
  colorQuality: DEFAULT_STREAM_PREFERENCES.colorQuality,
  region: "",
  clipboardPaste: false,
  mouseSensitivity: 1,
  mouseAcceleration: 1,
  shortcutToggleStats: "F3",
  shortcutTogglePointerLock: "F8",
  shortcutToggleFullscreen: "F10",
  shortcutStopStream: "Ctrl+Shift+Q",
  shortcutToggleAntiAfk: "Ctrl+Shift+K",
  shortcutToggleMicrophone: "Ctrl+Shift+M",
  shortcutScreenshot: "F11",
  shortcutToggleRecording: "F12",
  microphoneMode: "disabled",
  microphoneDeviceId: "",
  hideStreamButtons: false,
  showAntiAfkIndicator: true,
  showStatsOnLaunch: false,
  hideServerSelector: false,
  controllerMode: false,
  controllerUiSounds: false,
  controllerBackgroundAnimations: false,
  autoLoadControllerLibrary: false,
  autoFullScreen: false,
  favoriteGameIds: [],
  sessionCounterEnabled: false,
  sessionClockShowEveryMinutes: 60,
  sessionClockShowDurationSeconds: 30,
  windowWidth: 1400,
  windowHeight: 900,
  keyboardLayout: "en-US",
  gameLanguage: "en_US",
  enableL4S: false,
  enableCloudGsync: false,
  discordRichPresence: false,
  autoCheckForUpdates: false,
};

const mockGames: GameInfo[] = [
  {
    id: "cyberpunk-2077",
    uuid: "cyberpunk-2077-uuid",
    launchAppId: "12345",
    title: "Cyberpunk 2077",
    description: "An open-world action-adventure RPG set in the megalopolis of Night City.",
    longDescription: "Cyberpunk 2077 is an open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification.",
    featureLabels: ["Singleplayer", "RPG", "Open World", "Cyberpunk", "FPS"],
    genres: ["RPG", "Action", "Adventure"],
    imageUrl: "https://cdn.example.com/games/cyberpunk2077.jpg",
    membershipTierLabel: "Ultimate",
    publisherName: "CD Projekt Red",
    contentRatings: ["ESRB:M", "PEGI:18"],
    playabilityState: "AVAILABLE",
    availableStores: ["GOG", "Steam", "Epic Games Store"],
    searchText: "cyberpunk 2077 rpg action cd projekt",
    selectedVariantIndex: 0,
    variants: [
      { id: "12345", store: "GOG", supportedControls: ["keyboard", "mouse", "gamepad"] },
      { id: "12346", store: "Steam", supportedControls: ["keyboard", "mouse", "gamepad"] },
    ],
  },
  {
    id: "elden-ring",
    uuid: "elden-ring-uuid",
    launchAppId: "23456",
    title: "Elden Ring",
    description: "THE NEW RPG FROM ELDEN RING DIRECTOR HIDETAKA MIYAZAKI.",
    featureLabels: ["Singleplayer", "Co-op", "RPG", "Fantasy", "Souls-like"],
    genres: ["RPG", "Action", "Adventure"],
    imageUrl: "https://cdn.example.com/games/eldenring.jpg",
    membershipTierLabel: "Ultimate",
    publisherName: "Bandai Namco",
    contentRatings: ["ESRB:M", "PEGI:16"],
    playabilityState: "AVAILABLE",
    availableStores: ["Steam"],
    searchText: "elden ring souls fromsoftware bandai",
    selectedVariantIndex: 0,
    variants: [
      { id: "23456", store: "Steam", supportedControls: ["keyboard", "mouse", "gamepad"] },
    ],
  },
  {
    id: "baldurs-gate-3",
    uuid: "baldurs-gate-3-uuid",
    launchAppId: "34567",
    title: "Baldur's Gate 3",
    description: "A fifth-column tabletop experience you can play solo or cooperatively with friends.",
    featureLabels: ["Singleplayer", "Co-op", "RPG", "Fantasy", "CRPG"],
    genres: ["RPG", "Strategy"],
    imageUrl: "https://cdn.example.com/games/bg3.jpg",
    membershipTierLabel: "Ultimate",
    publisherName: "Larian Studios",
    contentRatings: ["ESRB:M", "PEGI:18"],
    playabilityState: "AVAILABLE",
    availableStores: ["Steam"],
    searchText: "baldurs gate 3 dnd rpg larian",
    selectedVariantIndex: 0,
    variants: [
      { id: "34567", store: "Steam", supportedControls: ["keyboard", "mouse"] },
    ],
  },
  {
    id: "fortnite",
    uuid: "fortnite-uuid",
    launchAppId: "45678",
    title: "Fortnite",
    description: "Battle Royale, Zero Build, Creative, and Save the World.",
    featureLabels: ["Multiplayer", "Battle Royale", "Shooter", "Free-to-Play"],
    genres: ["Action", "Shooter"],
    imageUrl: "https://cdn.example.com/games/fortnite.jpg",
    membershipTierLabel: "Free",
    publisherName: "Epic Games",
    contentRatings: ["ESRB:T", "PEGI:12"],
    playabilityState: "AVAILABLE",
    availableStores: ["Epic Games Store"],
    searchText: "fortnite battle royale epic",
    selectedVariantIndex: 0,
    variants: [
      { id: "45678", store: "Epic Games Store", supportedControls: ["keyboard", "mouse", "gamepad"] },
    ],
  },
  {
    id: "minecraft",
    uuid: "minecraft-uuid",
    launchAppId: "56789",
    title: "Minecraft",
    description: "Build, explore, and survive in a procedurally generated world.",
    featureLabels: ["Singleplayer", "Multiplayer", "Sandbox", "Creative", "Survival"],
    genres: ["Sandbox", "Adventure"],
    imageUrl: "https://cdn.example.com/games/minecraft.jpg",
    membershipTierLabel: "Free",
    publisherName: "Mojang Studios",
    contentRatings: ["ESRB:E10+", "PEGI:7"],
    playabilityState: "AVAILABLE",
    availableStores: ["Minecraft Launcher"],
    searchText: "minecraft sandbox creative mojang",
    selectedVariantIndex: 0,
    variants: [
      { id: "56789", store: "Minecraft Launcher", supportedControls: ["keyboard", "mouse", "gamepad"] },
    ],
  },
  {
    id: "witcher-3",
    uuid: "witcher-3-uuid",
    launchAppId: "67890",
    title: "The Witcher 3: Wild Hunt",
    description: "You are Geralt of Rivia, mercenary witcher. Before you lies a land of eternal conflict.",
    featureLabels: ["Singleplayer", "RPG", "Fantasy", "Open World"],
    genres: ["RPG", "Action", "Adventure"],
    imageUrl: "https://cdn.example.com/games/witcher3.jpg",
    membershipTierLabel: "Ultimate",
    publisherName: "CD Projekt Red",
    contentRatings: ["ESRB:M", "PEGI:18"],
    playabilityState: "AVAILABLE",
    availableStores: ["GOG", "Steam"],
    searchText: "witcher 3 wild hunt gwent cd projekt",
    selectedVariantIndex: 0,
    variants: [
      { id: "67890", store: "GOG", supportedControls: ["keyboard", "mouse", "gamepad"] },
    ],
  },
  {
    id: "valorant",
    uuid: "valorant-uuid",
    launchAppId: "78901",
    title: "VALORANT",
    description: "A free-to-play first-person tactical hero shooter set in the near future.",
    featureLabels: ["Multiplayer", "Competitive", "Shooter", "Tactical", "Free-to-Play"],
    genres: ["Shooter", "Tactical"],
    imageUrl: "https://cdn.example.com/games/valorant.jpg",
    membershipTierLabel: "Free",
    publisherName: "Riot Games",
    contentRatings: ["ESRB:T", "PEGI:16"],
    playabilityState: "AVAILABLE",
    availableStores: ["Epic Games Store"],
    searchText: "valorant riot tactical shooter",
    selectedVariantIndex: 0,
    variants: [
      { id: "78901", store: "Epic Games Store", supportedControls: ["keyboard", "mouse"] },
    ],
  },
  {
    id: "gta-v",
    uuid: "gta-v-uuid",
    launchAppId: "89012",
    title: "Grand Theft Auto V",
    description: "A sprawling, satirical take on modern-day America with an acclaimed story mode.",
    featureLabels: ["Singleplayer", "Multiplayer", "Open World", "Action", "Crime"],
    genres: ["Action", "Adventure"],
    imageUrl: "https://cdn.example.com/games/gtav.jpg",
    membershipTierLabel: "Ultimate",
    publisherName: "Rockstar Games",
    contentRatings: ["ESRB:M", "PEGI:18"],
    playabilityState: "AVAILABLE",
    availableStores: ["Rockstar Games Store"],
    searchText: "gta v grand theft auto rockstar",
    selectedVariantIndex: 0,
    variants: [
      { id: "89012", store: "Rockstar Games Store", supportedControls: ["keyboard", "mouse", "gamepad"] },
    ],
  },
  {
    id: "apex-legends",
    uuid: "apex-legends-uuid",
    launchAppId: "90123",
    title: "Apex Legends",
    description: "A free-to-play hero shooter where dangerous competitors compete in a Battle Royale.",
    featureLabels: ["Multiplayer", "Battle Royale", "Hero Shooter", "Free-to-Play"],
    genres: ["Shooter", "Battle Royale"],
    imageUrl: "https://cdn.example.com/games/apex.jpg",
    membershipTierLabel: "Free",
    publisherName: "Electronic Arts",
    contentRatings: ["ESRB:T", "PEGI:16"],
    playabilityState: "AVAILABLE",
    availableStores: ["EA App"],
    searchText: "apex legends battle royale ea respawn",
    selectedVariantIndex: 0,
    variants: [
      { id: "90123", store: "EA App", supportedControls: ["keyboard", "mouse", "gamepad"] },
    ],
  },
  {
    id: "destiny-2",
    uuid: "destiny-2-uuid",
    launchAppId: "01234",
    title: "Destiny 2",
    description: "A free-to-play online-only multiplayer first-person shooter video game.",
    featureLabels: ["Multiplayer", "MMO", "Shooter", "Looter", "Free-to-Play"],
    genres: ["Shooter", "MMO"],
    imageUrl: "https://cdn.example.com/games/destiny2.jpg",
    membershipTierLabel: "Free",
    publisherName: "Bungie",
    contentRatings: ["ESRB:T", "PEGI:16"],
    playabilityState: "AVAILABLE",
    availableStores: ["Steam"],
    searchText: "destiny 2 bungie looter shooter mmo",
    selectedVariantIndex: 0,
    variants: [
      { id: "01234", store: "Steam", supportedControls: ["keyboard", "mouse", "gamepad"] },
    ],
  },
];

function filterGames(games: GameInfo[], searchQuery: string): GameInfo[] {
  if (!searchQuery.trim()) return games;
  const query = searchQuery.toLowerCase();
  return games.filter((game) => {
    if (game.title.toLowerCase().includes(query)) return true;
    if (game.publisherName?.toLowerCase().includes(query)) return true;
    if (game.genres?.some((g) => g.toLowerCase().includes(query))) return true;
    if (game.featureLabels?.some((l) => l.toLowerCase().includes(query))) return true;
    return false;
  });
}

interface SignalingCallbacks {
  onEvent: (event: MainToRendererSignalingEvent) => void;
}

class WebSignalingClient {
  private callbacks: SignalingCallbacks | null = null;
  private connected = false;

  connect(_url: string, _sessionId: string, callbacks: SignalingCallbacks): void {
    this.callbacks = callbacks;
    this.connected = true;
    console.log("[WebSignaling] Connected (mock)");
    setTimeout(() => {
      this.callbacks?.onEvent({ type: "connected" });
    }, 100);
  }

  disconnect(): void {
    this.connected = false;
    this.callbacks = null;
    console.log("[WebSignaling] Disconnected (mock)");
    setTimeout(() => {
      this.callbacks?.onEvent({ type: "disconnected", reason: "User disconnected" });
    }, 50);
  }

  sendAnswer(_sdp: string): void {
    console.log("[WebSignaling] Answer sent (mock)");
  }

  sendIceCandidate(_candidate: IceCandidatePayload): void {
    console.log("[WebSignaling] ICE candidate sent (mock)");
  }

  isConnected(): boolean {
    return this.connected;
  }
}

const signalingClient = new WebSignalingClient();

export function createWebApi(): OpenNowApi {
  return {
    getAuthSession: (_input?: AuthSessionRequest): Promise<AuthSessionResult> => {
      const session = storageGet<AuthSession | null>(SESSION_KEY, null);
      return Promise.resolve({
        session,
        refresh: session ? { attempted: false, forced: false, outcome: "not_attempted", message: "Using saved session" } : { attempted: false, forced: false, outcome: "missing_refresh_token", message: "No saved session" },
      });
    },

    getLoginProviders: (): Promise<LoginProvider[]> => {
      return Promise.resolve(mockProviders);
    },

    getRegions: (_input?: RegionsFetchRequest): Promise<StreamRegion[]> => {
      return Promise.resolve([
        { name: "North America - West", url: "https://na-west.gfn.nvidia.com", pingMs: 25 },
        { name: "North America - East", url: "https://na-east.gfn.nvidia.com", pingMs: 45 },
        { name: "Europe", url: "https://eu.gfn.nvidia.com", pingMs: 85 },
        { name: "Japan", url: "https://jp.gfn.nvidia.com", pingMs: 150 },
        { name: "South Korea", url: "https://kr.gfn.nvidia.com", pingMs: 180 },
      ]);
    },

    login: async (_input: AuthLoginRequest): Promise<AuthSession> => {
      const demoSession: AuthSession = {
        provider: mockProviders[0],
        tokens: {
          accessToken: `demo_token_${Date.now()}`,
          refreshToken: `demo_refresh_${Date.now()}`,
          idToken: `demo_id_${Date.now()}`,
          expiresAt: Date.now() + 3600000,
          clientToken: `demo_client_${Date.now()}`,
          clientTokenExpiresAt: Date.now() + 86400000,
          clientTokenLifetimeMs: 86400000,
        },
        user: {
          userId: "demo-user-123",
          displayName: "Demo User",
          email: "demo@example.com",
          avatarUrl: "https://www.gravatar.com/avatar/demo",
          membershipTier: "Ultimate",
        },
      };
      storageSet(SESSION_KEY, demoSession);
      return demoSession;
    },

    logout: (): Promise<void> => {
      storageSet(SESSION_KEY, null);
      return Promise.resolve();
    },

    logoutAll: (): Promise<void> => {
      storageSet(SESSION_KEY, null);
      storageSet(ACCOUNTS_KEY, []);
      return Promise.resolve();
    },

    getSavedAccounts: (): Promise<SavedAccount[]> => {
      return Promise.resolve(storageGet<SavedAccount[]>(ACCOUNTS_KEY, []));
    },

    switchAccount: (_userId: string): Promise<AuthSession> => {
      return Promise.reject(new Error("Account switching not available in web version"));
    },

    removeAccount: (_userId: string): Promise<void> => {
      const accounts = storageGet<SavedAccount[]>(ACCOUNTS_KEY, []);
      storageSet(ACCOUNTS_KEY, accounts.filter((a) => a.userId !== _userId));
      return Promise.resolve();
    },

    fetchSubscription: (_input: SubscriptionFetchRequest): Promise<SubscriptionInfo> => {
      return Promise.resolve({
        membershipTier: "Ultimate",
        subscriptionType: "PC Streaming",
        subscriptionSubType: "Ultimate",
        allottedHours: 999,
        purchasedHours: 0,
        rolledOverHours: 0,
        usedHours: 0,
        remainingHours: 999,
        totalHours: 999,
        isUnlimited: true,
        entitledResolutions: [
          { width: 3840, height: 2160, fps: 60 },
          { width: 1920, height: 1080, fps: 60 },
        ],
      });
    },

    fetchMainGames: (_input: GamesFetchRequest): Promise<GameInfo[]> => {
      return Promise.resolve(mockGames.slice(0, 6));
    },

    fetchLibraryGames: (_input: GamesFetchRequest): Promise<GameInfo[]> => {
      return Promise.resolve(mockGames);
    },

    browseCatalog: (input: CatalogBrowseRequest): Promise<CatalogBrowseResult> => {
      const filtered = filterGames(mockGames, input.searchQuery ?? "");
      return Promise.resolve({
        games: filtered,
        numberReturned: filtered.length,
        numberSupported: filtered.length,
        totalCount: filtered.length,
        hasNextPage: false,
        searchQuery: input.searchQuery ?? "",
        selectedSortId: input.sortId ?? "relevance",
        selectedFilterIds: input.filterIds ?? [],
        filterGroups: [
          {
            id: "genre",
            label: "Genre",
            options: [
              { id: "action", rawId: "action", label: "Action", groupId: "genre", groupLabel: "Genre" },
              { id: "rpg", rawId: "rpg", label: "RPG", groupId: "genre", groupLabel: "Genre" },
              { id: "shooter", rawId: "shooter", label: "Shooter", groupId: "genre", groupLabel: "Genre" },
              { id: "sandbox", rawId: "sandbox", label: "Sandbox", groupId: "genre", groupLabel: "Genre" },
            ],
          },
          {
            id: "tier",
            label: "Membership Tier",
            options: [
              { id: "free", rawId: "Free", label: "Free", groupId: "tier", groupLabel: "Membership Tier" },
              { id: "ultimate", rawId: "Ultimate", label: "Ultimate", groupId: "tier", groupLabel: "Membership Tier" },
            ],
          },
        ],
        sortOptions: [
          { id: "relevance", label: "Relevance", orderBy: "relevance" },
          { id: "a_to_z", label: "A to Z", orderBy: "title ASC" },
          { id: "z_to_a", label: "Z to A", orderBy: "title DESC" },
          { id: "last_played", label: "Last Played", orderBy: "lastPlayed DESC" },
          { id: "last_added", label: "Recently Added", orderBy: "lastPlayed DESC" },
          { id: "most_popular", label: "Most Popular", orderBy: "membershipTierLabel DESC" },
        ],
      });
    },

    fetchPublicGames: (): Promise<GameInfo[]> => {
      return Promise.resolve(mockGames);
    },

    resolveLaunchAppId: (input: ResolveLaunchIdRequest): Promise<string | null> => {
      const game = mockGames.find((g) => g.uuid === input.appIdOrUuid || g.id === input.appIdOrUuid);
      return Promise.resolve(game?.launchAppId ?? null);
    },

    createSession: (input: SessionCreateRequest): Promise<SessionInfo> => {
      console.log("[WebApi] createSession called (demo mode):", input.internalTitle);
      return Promise.resolve({
        sessionId: `demo-session-${Date.now()}`,
        status: 3,
        zone: input.zone,
        streamingBaseUrl: input.streamingBaseUrl,
        serverIp: "127.0.0.1",
        signalingServer: "wss://signaling.gfn.nvidia.com",
        signalingUrl: "wss://signaling.gfn.nvidia.com/demo",
        gpuType: "RTX 4080",
        iceServers: [{ urls: ["stun:stun.l.google.com:19302"] }],
        clientId: `client-${Date.now()}`,
        deviceId: `device-web-${Date.now()}`,
      });
    },

    pollSession: (input: SessionPollRequest): Promise<SessionInfo> => {
      return Promise.resolve({
        sessionId: input.sessionId,
        status: 3,
        zone: input.zone,
        serverIp: input.serverIp ?? "127.0.0.1",
        signalingServer: "wss://signaling.gfn.nvidia.com",
        signalingUrl: "wss://signaling.gfn.nvidia.com/demo",
        gpuType: "RTX 4080",
        iceServers: [{ urls: ["stun:stun.l.google.com:19302"] }],
      });
    },

    reportSessionAd: (input: SessionAdReportRequest): Promise<SessionInfo> => {
      console.log("[WebApi] reportSessionAd:", input.action, input.adId);
      return Promise.resolve({
        sessionId: input.sessionId,
        status: 3,
        zone: input.zone,
        serverIp: input.serverIp ?? "127.0.0.1",
        signalingServer: "",
        signalingUrl: "",
        iceServers: [],
      });
    },

    stopSession: (_input: SessionStopRequest): Promise<void> => {
      console.log("[WebApi] stopSession called (demo mode)");
      return Promise.resolve();
    },

    getActiveSessions: (_token?: string, _streamingBaseUrl?: string): Promise<ActiveSessionInfo[]> => {
      return Promise.resolve([]);
    },

    claimSession: (input: SessionClaimRequest): Promise<SessionInfo> => {
      console.log("[WebApi] claimSession called (demo mode):", input.sessionId);
      return Promise.resolve({
        sessionId: input.sessionId,
        status: 3,
        zone: "prod",
        serverIp: input.serverIp,
        signalingServer: "wss://signaling.gfn.nvidia.com",
        signalingUrl: "wss://signaling.gfn.nvidia.com/demo",
        gpuType: "RTX 4080",
        iceServers: [{ urls: ["stun:stun.l.google.com:19302"] }],
      });
    },

    showSessionConflictDialog: (): Promise<SessionConflictChoice> => {
      return Promise.resolve("new");
    },

    connectSignaling: (input: SignalingConnectRequest): Promise<void> => {
      return new Promise((resolve) => {
        signalingClient.connect(input.signalingUrl ?? "", input.sessionId, {
          onEvent: (event) => {
            setTimeout(() => {
              if (event.type === "connected") {
                resolve();
              }
            }, 500);
          },
        });
      });
    },

    disconnectSignaling: (): Promise<void> => {
      signalingClient.disconnect();
      return Promise.resolve();
    },

    sendAnswer: (input: SendAnswerRequest): Promise<void> => {
      signalingClient.sendAnswer(input.sdp);
      return Promise.resolve();
    },

    sendIceCandidate: (input: IceCandidatePayload): Promise<void> => {
      signalingClient.sendIceCandidate(input);
      return Promise.resolve();
    },

    requestKeyframe: (_input: KeyframeRequest): Promise<void> => {
      console.log("[WebApi] requestKeyframe (demo mode)");
      return Promise.resolve();
    },

    onSignalingEvent: (_listener: (event: MainToRendererSignalingEvent) => void): (() => void) => {
      return () => {};
    },

    onToggleFullscreen: (listener: () => void): (() => void) => {
      const handler = () => listener();
      document.addEventListener("app:toggle-fullscreen", handler);
      return () => document.removeEventListener("app:toggle-fullscreen", handler);
    },

    quitApp: (): Promise<void> => {
      console.log("[WebApi] quitApp called - not supported in web");
      return Promise.resolve();
    },

    getUpdaterState: (): Promise<AppUpdaterState> => {
      return Promise.resolve({
        status: "disabled",
        currentVersion: "0.3.8",
        updateSource: "github-releases",
        canCheck: false,
        canDownload: false,
        canInstall: false,
        isPackaged: false,
      });
    },

    checkForUpdates: (): Promise<AppUpdaterState> => {
      return Promise.resolve({
        status: "disabled",
        currentVersion: "0.3.8",
        updateSource: "github-releases",
        canCheck: false,
        canDownload: false,
        canInstall: false,
        isPackaged: false,
      });
    },

    downloadUpdate: (): Promise<AppUpdaterState> => {
      return Promise.resolve({
        status: "error",
        currentVersion: "0.3.8",
        message: "Updates not available in web version",
        updateSource: "github-releases",
        canCheck: false,
        canDownload: false,
        canInstall: false,
        isPackaged: false,
      });
    },

    installUpdateAndRestart: (): Promise<AppUpdaterState> => {
      return Promise.resolve({
        status: "disabled",
        currentVersion: "0.3.8",
        updateSource: "github-releases",
        canCheck: false,
        canDownload: false,
        canInstall: false,
        isPackaged: false,
      });
    },

    onUpdaterStateChanged: (_listener: (state: AppUpdaterState) => void): (() => void) => {
      return () => {};
    },

    setFullscreen: async (v: boolean): Promise<void> => {
      if (v) {
        await document.documentElement.requestFullscreen().catch(() => {});
      } else {
        await document.exitFullscreen().catch(() => {});
      }
    },

    toggleFullscreen: async (): Promise<void> => {
      if (document.fullscreenElement) {
        await document.exitFullscreen().catch(() => {});
      } else {
        await document.documentElement.requestFullscreen().catch(() => {});
      }
    },

    togglePointerLock: (): Promise<void> => {
      if (document.pointerLockElement) {
        void document.exitPointerLock();
      } else {
        void document.body.requestPointerLock();
      }
      return Promise.resolve();
    },

    getSettings: (): Promise<Settings> => {
      return Promise.resolve(storageGet<Settings>(SETTINGS_KEY, { ...defaultSettings }));
    },

    setSetting: <K extends keyof Settings>(key: K, value: Settings[K]): Promise<void> => {
      const settings = storageGet<Settings>(SETTINGS_KEY, { ...defaultSettings });
      settings[key] = value;
      storageSet(SETTINGS_KEY, settings);
      return Promise.resolve();
    },

    resetSettings: (): Promise<Settings> => {
      storageSet(SETTINGS_KEY, { ...defaultSettings });
      return Promise.resolve({ ...defaultSettings });
    },

    getMicrophonePermission: async (): Promise<import("@shared/gfn").MicrophonePermissionResult> => {
      try {
        const result = await navigator.permissions.query({ name: "microphone" as PermissionName });
        return {
          platform: "linux",
          isMacOs: false,
          status: result.state === "granted" ? "granted" : result.state === "denied" ? "denied" : "not-determined",
          granted: result.state === "granted",
          canRequest: result.state === "prompt",
          shouldUseBrowserApi: true,
        };
      } catch {
        return {
          platform: "linux",
          isMacOs: false,
          status: "not-determined",
          granted: false,
          canRequest: true,
          shouldUseBrowserApi: true,
        };
      }
    },

    exportLogs: (_format?: "text" | "json"): Promise<string> => {
      return Promise.resolve("Logs export not available in web version");
    },

    pingRegions: (regions: StreamRegion[]): Promise<PingResult[]> => {
      return Promise.resolve(
        regions.map((r) => ({
          url: r.url,
          pingMs: Math.floor(Math.random() * 100) + 20,
        })),
      );
    },

    saveScreenshot: (input: ScreenshotSaveRequest): Promise<ScreenshotEntry> => {
      const screenshots = storageGet<ScreenshotEntry[]>(SCREENSHOTS_KEY, []);
      const entry: ScreenshotEntry = {
        id: `screenshot-${Date.now()}`,
        fileName: `screenshot-${Date.now()}.png`,
        filePath: "",
        createdAtMs: Date.now(),
        sizeBytes: input.dataUrl.length,
        dataUrl: input.dataUrl,
      };
      screenshots.unshift(entry);
      storageSet(SCREENSHOTS_KEY, screenshots);
      return Promise.resolve(entry);
    },

    listScreenshots: (): Promise<ScreenshotEntry[]> => {
      return Promise.resolve(storageGet<ScreenshotEntry[]>(SCREENSHOTS_KEY, []));
    },

    deleteScreenshot: (input: ScreenshotDeleteRequest): Promise<void> => {
      const screenshots = storageGet<ScreenshotEntry[]>(SCREENSHOTS_KEY, []);
      storageSet(
        SCREENSHOTS_KEY,
        screenshots.filter((s) => s.id !== input.id),
      );
      return Promise.resolve();
    },

    saveScreenshotAs: (input: ScreenshotSaveAsRequest): Promise<ScreenshotSaveAsResult> => {
      const screenshots = storageGet<ScreenshotEntry[]>(SCREENSHOTS_KEY, []);
      const entry = screenshots.find((s) => s.id === input.id);
      if (!entry) {
        return Promise.resolve({ saved: false });
      }
      const link = document.createElement("a");
      link.href = entry.dataUrl;
      link.download = entry.fileName;
      link.click();
      return Promise.resolve({ saved: true, filePath: entry.fileName });
    },

    onTriggerScreenshot: (listener: () => void): (() => void) => {
      const handler = () => listener();
      document.addEventListener("app:trigger-screenshot", handler);
      return () => document.removeEventListener("app:trigger-screenshot", handler);
    },

    beginRecording: (input: RecordingBeginRequest): Promise<RecordingBeginResult> => {
      console.log("[WebApi] beginRecording:", input.mimeType);
      return Promise.resolve({ recordingId: `recording-${Date.now()}` });
    },

    sendRecordingChunk: (input: RecordingChunkRequest): Promise<void> => {
      console.log("[WebApi] sendRecordingChunk:", input.recordingId, input.chunk.byteLength);
      return Promise.resolve();
    },

    finishRecording: (input: RecordingFinishRequest): Promise<RecordingEntry> => {
      const recordings = storageGet<RecordingEntry[]>(RECORDINGS_KEY, []);
      const entry: RecordingEntry = {
        id: input.recordingId,
        fileName: `recording-${Date.now()}.webm`,
        filePath: "",
        createdAtMs: Date.now(),
        sizeBytes: 0,
        durationMs: input.durationMs,
        gameTitle: input.gameTitle,
        thumbnailDataUrl: input.thumbnailDataUrl,
      };
      recordings.unshift(entry);
      storageSet(RECORDINGS_KEY, recordings);
      return Promise.resolve(entry);
    },

    abortRecording: (input: RecordingAbortRequest): Promise<void> => {
      console.log("[WebApi] abortRecording:", input.recordingId);
      return Promise.resolve();
    },

    listRecordings: (): Promise<RecordingEntry[]> => {
      return Promise.resolve(storageGet<RecordingEntry[]>(RECORDINGS_KEY, []));
    },

    deleteRecording: (input: RecordingDeleteRequest): Promise<void> => {
      const recordings = storageGet<RecordingEntry[]>(RECORDINGS_KEY, []);
      storageSet(
        RECORDINGS_KEY,
        recordings.filter((r) => r.id !== input.id),
      );
      return Promise.resolve();
    },

    showRecordingInFolder: (_id: string): Promise<void> => {
      console.log("[WebApi] showRecordingInFolder - not supported in web");
      return Promise.resolve();
    },

    listMediaByGame: (_input?: { gameTitle?: string }): Promise<MediaListingResult> => {
      return Promise.resolve({
        screenshots: storageGet<ScreenshotEntry[]>(SCREENSHOTS_KEY, []).map((s) => ({
          id: s.id,
          fileName: s.fileName,
          filePath: s.filePath,
          createdAtMs: s.createdAtMs,
          sizeBytes: s.sizeBytes,
          thumbnailDataUrl: s.dataUrl,
          dataUrl: s.dataUrl,
        })),
        videos: storageGet<RecordingEntry[]>(RECORDINGS_KEY, []).map((r) => ({
          id: r.id,
          fileName: r.fileName,
          filePath: r.filePath,
          createdAtMs: r.createdAtMs,
          sizeBytes: r.sizeBytes,
          durationMs: r.durationMs,
          gameTitle: r.gameTitle,
          thumbnailDataUrl: r.thumbnailDataUrl,
        })),
      });
    },

    getMediaThumbnail: (input: { filePath: string }): Promise<string | null> => {
      const screenshots = storageGet<ScreenshotEntry[]>(SCREENSHOTS_KEY, []);
      const entry = screenshots.find((s) => s.filePath === input.filePath);
      return Promise.resolve(entry?.dataUrl ?? null);
    },

    showMediaInFolder: (_input: { filePath: string }): Promise<void> => {
      console.log("[WebApi] showMediaInFolder - not supported in web");
      return Promise.resolve();
    },

    deleteCache: (): Promise<void> => {
      console.log("[WebApi] deleteCache - not supported in web");
      return Promise.resolve();
    },

    fetchPrintedWasteQueue: (): Promise<PrintedWasteQueueData> => {
      return Promise.resolve({});
    },

    fetchPrintedWasteServerMapping: (): Promise<PrintedWasteServerMapping> => {
      return Promise.resolve({});
    },

    getThanksData: (): Promise<ThankYouDataResult> => {
      return Promise.resolve({
        contributors: [
          { login: "zortos293", avatarUrl: "https://github.com/avatars/zortos293", profileUrl: "https://github.com/zortos293", contributions: 100 },
        ],
        supporters: [],
      });
    },

    clearDiscordActivity: (): Promise<void> => {
      console.log("[WebApi] clearDiscordActivity - not supported in web");
      return Promise.resolve();
    },
  };
}
