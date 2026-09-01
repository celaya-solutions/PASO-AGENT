// Matrix tests cover device health plugin behavior.
import { describe, expect, it } from "vitest";
import { isOpenClawManagedMatrixDevice, summarizeMatrixDeviceHealth } from "./device-health.js";

describe("matrix device health", () => {
  it("detects PASO-managed device names", () => {
    expect(isOpenClawManagedMatrixDevice("PASO Gateway")).toBe(true);
    expect(isOpenClawManagedMatrixDevice("PASO Debug")).toBe(true);
    expect(isOpenClawManagedMatrixDevice("OpenClaw Gateway")).toBe(true);
    expect(isOpenClawManagedMatrixDevice("Element iPhone")).toBe(false);
    expect(isOpenClawManagedMatrixDevice(null)).toBe(false);
  });

  it("summarizes stale PASO-managed devices separately from the current device", () => {
    const summary = summarizeMatrixDeviceHealth([
      {
        deviceId: "du314Zpw3A",
        displayName: "PASO Gateway",
        current: true,
      },
      {
        deviceId: "BritdXC6iL",
        displayName: "PASO Gateway",
        current: false,
      },
      {
        deviceId: "G6NJU9cTgs",
        displayName: "PASO Debug",
        current: false,
      },
      {
        deviceId: "phone123",
        displayName: "Element iPhone",
        current: false,
      },
    ]);

    expect(summary).toEqual({
      currentDeviceId: "du314Zpw3A",
      currentOpenClawDevices: [
        {
          deviceId: "du314Zpw3A",
          displayName: "PASO Gateway",
          current: true,
        },
      ],
      staleOpenClawDevices: [
        {
          deviceId: "BritdXC6iL",
          displayName: "PASO Gateway",
          current: false,
        },
        {
          deviceId: "G6NJU9cTgs",
          displayName: "PASO Debug",
          current: false,
        },
      ],
    });
  });
});
