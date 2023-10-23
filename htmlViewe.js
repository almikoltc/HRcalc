import htmlTableResult from "./components/func/htmlTableResult.js";
import fs from "fs";
import jsn from "./components/catalogs/cities.json" assert { type: 'json' };

htmlTableResult(jsn);