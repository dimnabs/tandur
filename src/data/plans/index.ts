import { z } from "zod";

import kangkungDiPot from "./kangkung-di-pot.json";
import { planSchema, type Plan } from "./schema";

export const plans: Plan[] = z.array(planSchema).parse([kangkungDiPot]);

export function getPlanById(id: string): Plan | undefined {
    return plans.find((plan) => plan.id === id);
}
