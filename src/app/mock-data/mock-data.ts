import { District } from "../entities/district";
import { State } from "../entities/state";
import { Form } from "../entities/form";
import { Frequency } from "../entities/frequency";
import { Block } from "../entities/block";
import { Service_point } from "../entities/service-points";
import { Financial_year } from "../entities/financial-year";
/**
 * Created by vinay on 27/1/19.
 */

export const GEO_COORDS = [
  { state: "Assam", district: "Baksa", lat: 26.6560299, lng: 90.7793029 },
  { state: "Assam", district: "Barpeta", lat: 26.4367606, lng: 90.4018524 },
  { state: "Assam", district: "Darrang", lat: 26.4137819, lng: 91.8098339 },
  { state: "Assam", district: "Dhubri", lat: 26.0257797, lng: 89.9584362 },
  { state: "Assam", district: "Goalpara", lat: 26.0519385, lng: 90.3307469 },

  { state: "Bihar", district: "Araria", lat: 26.1317584, lng: 87.4104443 },
  { state: "Bihar", district: "Begusarai", lat: 25.4179097, lng: 86.0900267 },
  { state: "Bihar", district: "Katihar", lat: 25.5515695, lng: 87.533851 },
  { state: "Bihar", district: "Sheikhpura", lat: 25.1243895, lng: 85.669927 },
  { state: "Bihar", district: "Sitamarhi", lat: 26.5817101, lng: 85.4679663 },

  { state: "Jharkhand", district: "Pakur", lat: 24.6370776, lng: 87.8248414 },
  { state: "Jharkhand", district: "Sahibganj", lat: 25.2289715, lng: 87.6270172 },

  { state: "Madhya Pradesh", district: "Barwani", lat: 22.0378984, lng: 74.8867724 },
  { state: "Madhya Pradesh", district: "Damoh", lat: 23.8246813, lng: 79.4020978 },
  { state: "Madhya Pradesh", district: "Khandwa", lat: 21.8303536, lng: 76.3173951 },
  { state: "Madhya Pradesh", district: "Singrauli", lat: 24.1989812, lng: 82.6434514 },
  { state: "Madhya Pradesh", district: "Vidisha", lat: 23.5202708, lng: 77.7800051 },

  { state: "Maharashtra", district: "Nandurbar", lat: 21.3692741, lng: 74.2123102 },

  { state: "Rajasthan", district: "Baran", lat: 25.0955323, lng: 76.450201 },
  { state: "Rajasthan", district: "Jaisalmer", lat: 26.903651, lng: 70.8597104 },

  { state: "Uttar Pradesh", district: "Bahraich", lat: 27.5666666667, lng: 81.6333333333 },
  { state: "Uttar Pradesh", district: "Sonbhadra", lat: 24.335215, lng: 83.049944 },
  { state: "Uttar Pradesh", district: "Balrampur", lat: 27.4337241, lng: 81.8546602 },
  { state: "Uttar Pradesh", district: "Shrawasti", lat: 27.6055688, lng: 81.6475883 },
  { state: "Uttar Pradesh", district: "Chitrakoot", lat: 25.2143534, lng: 80.5635187 },
];
export const DISTRICTS: District[] = [
  { id: 1, district_name: "Agra" },
  { id: 2, district_name: "Araria" },
  { id: 3, district_name: "Barpeta" },
  { id: 4, district_name: "Bhopal" },
  { id: 5, district_name: "Chirang" },
  { id: 6, district_name: "Dhule" },
  { id: 7, district_name: "Dangarpur" },
  { id: 8, district_name: "Jhabua" },
  { id: 9, district_name: "Kota" },
  { id: 10, district_name: "Khunti" },
  { id: 11, district_name: "Mumbai" },
  { id: 12, district_name: "Pilibhit" },
  { id: 13, district_name: "Ranchi" },
  { id: 14, district_name: "Sheohar" },
];
export const STATES: State[] = [
  { id: 1, state_name: "Assam" },
  { id: 2, state_name: "Bihar" },
  { id: 3, state_name: "Madhya Pradesh" },
  { id: 4, state_name: "Jharkhand" },
  { id: 5, state_name: "Maharastra" },
  { id: 6, state_name: "Rajasthan" },
  { id: 7, state_name: "Uttar Pradesh" },
];
export const FORMS: Form[] = [
  { id: 1, form_name: "DHS" },
  { id: 2, form_name: "CHS" },
  { id: 3, form_name: "PHC" },
  { id: 4, form_name: "SHC" },
];
export const SERVICE_POINTS: Service_point[] = [
  { id: 1, service_point_name: "General" },
  { id: 2, service_point_name: "Training" },
  { id: 3, service_point_name: "Equip & D" },
  { id: 4, service_point_name: "Infrastructure" },
  { id: 5, service_point_name: "Manpower" },
  { id: 6, service_point_name: "L&D" },
];
export const FINANCIAL_YEARS: Financial_year[] = [
  { year: 2019 },
  { year: 2018 },
  { year: 2017 },
  { year: 2016 },
  { year: 2015 },
  { year: 2014 },
  { year: 2013 },
  { year: 2012 },
  { year: 2011 },
];
export const FREQUENCY: Frequency[] = [
  { id: 1, frequency: "Monthly" },
  { id: 2, frequency: "Quarterly" },
  { id: 3, frequency: "Half yearly" },
  { id: 4, frequency: "Yearly" },
];
export const BLOCKS: Block[] = [
  { id: 1, block: "Robertsganj" },
  { id: 2, block: "Ghorawal" },
  { id: 3, block: "Dudhi" },
  { id: 4, block: "Babhani" },
  { id: 5, block: "Chopan" },
  { id: 6, block: "Nagwan" },
  { id: 7, block: "Chatra" },
  { id: 8, block: "Myorpur" },
  { id: 9, block: "Urban" },
];
