import type { Market, AlbumWithTracks, Albums, MaxInt, Page, Track } from '../types.js';
import EndpointsBase from './EndpointsBase.js';

export default class AlbumsEndpoints extends EndpointsBase {

    public async get(id: string, market?: Market): Promise<AlbumWithTracks>;
    public async get(ids: string[], market?: Market): Promise<AlbumWithTracks[]>;
    public async get(idOrIds: string | string[], market?: Market) {
        if (typeof idOrIds === 'string') {
            const params = this.paramsFor({ market });
            const album = await this.getRequest<AlbumWithTracks>(`albums/${idOrIds}${params}`);
            return album;
        }

        const params = this.paramsFor({ ids: idOrIds, market });
        // TODO: only returns top 20, validate here
        const response = await this.getRequest<Albums>(`albums${params}`);
        return response.albums;
    }

    public tracks(albumId: string, market?: Market, limit?: MaxInt<50>, offset?: number) {
        const params = this.paramsFor({ market, limit, offset });
        return this.getRequest<Page<Track>>(`albums/${albumId}/tracks${params}`);
    }
}
