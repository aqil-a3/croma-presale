export interface PresaleApiTypes {
  getAllPresale: () => Promise<PresaleDb[]>;
  getActivePresale: () => Promise<PresaleDb>;
  createNewPresale:(data:PresaleClient) => Promise<void>
}
