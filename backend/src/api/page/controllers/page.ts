import schema from "../content-types/page/schema.json";
import createPopulatedController from "../../../helpers/populate";

export default createPopulatedController("api::page.page", schema);
