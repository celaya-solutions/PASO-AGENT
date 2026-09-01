// Matrix plugin module implements device health behavior.
export type MatrixManagedDeviceInfo = {
  deviceId: string;
  displayName: string | null;
  current: boolean;
};

type MatrixDeviceHealthSummary = {
  currentDeviceId: string | null;
  staleOpenClawDevices: MatrixManagedDeviceInfo[];
  currentOpenClawDevices: MatrixManagedDeviceInfo[];
};

const OPENCLAW_DEVICE_NAME_PREFIXES = ["PASO ", "OpenClaw "] as const;

export function isOpenClawManagedMatrixDevice(displayName: string | null | undefined): boolean {
  return (
    displayName !== null &&
    displayName !== undefined &&
    OPENCLAW_DEVICE_NAME_PREFIXES.some((prefix) => displayName.startsWith(prefix))
  );
}

export function summarizeMatrixDeviceHealth(
  devices: MatrixManagedDeviceInfo[],
): MatrixDeviceHealthSummary {
  const currentDeviceId = devices.find((device) => device.current)?.deviceId ?? null;
  const openClawDevices = devices.filter((device) =>
    isOpenClawManagedMatrixDevice(device.displayName),
  );
  return {
    currentDeviceId,
    staleOpenClawDevices: openClawDevices.filter((device) => !device.current),
    currentOpenClawDevices: openClawDevices.filter((device) => device.current),
  };
}
