import {
  isOpenClawTabGroupTitle,
  OPENCLAW_TAB_GROUP_TITLE,
  OPENCLAW_TAB_GROUP_TITLES,
} from "./relay-core.js";

async function isOpenClawGroupId(groupId) {
  if (!Number.isInteger(groupId) || groupId < 0) {
    return false;
  }
  try {
    const group = await chrome.tabGroups.get(groupId);
    return isOpenClawTabGroupTitle(group.title);
  } catch {
    return false;
  }
}

export async function isTabSelected(tab) {
  return await isOpenClawGroupId(tab?.groupId);
}

export async function addTabToOpenClawGroup(tabId, { chromeApi, getGroupColor, created }) {
  const assertCurrent = () => created?.assertCurrent();
  const tab = await chromeApi.tabs.get(tabId);
  assertCurrent();
  if (created && (tab.groupId !== created.groupId || tab.windowId !== created.tab.windowId)) {
    throw new Error(`tab ${tabId} changed during creation`);
  }
  const groups = (
    await Promise.all(
      OPENCLAW_TAB_GROUP_TITLES.map((title) =>
        chromeApi.tabGroups.query({ title }).catch(() => []),
      ),
    )
  ).flat();
  assertCurrent();
  const group = groups.find((candidate) => candidate.windowId === tab.windowId);
  const color = group ? undefined : await getGroupColor();
  assertCurrent();
  if (created) {
    created.grouping = true;
    created.initialGroup = !group;
    created.expectedGroupId = group?.id;
  }
  const groupId = await chromeApi.tabs.group({
    tabIds: [tabId],
    ...(group ? { groupId: group.id } : {}),
  });
  assertCurrent();
  if (created) {
    if (created.expectedGroupId !== undefined && created.expectedGroupId !== groupId) {
      throw new Error(`tab ${tabId} group changed during creation`);
    }
    created.groupId = groupId;
    created.expectedGroupId = groupId;
  }
  if (!group || group.title !== OPENCLAW_TAB_GROUP_TITLE) {
    if (created) {
      created.namingGroup = groupId;
    }
    await chromeApi.tabGroups.update(groupId, {
      title: OPENCLAW_TAB_GROUP_TITLE,
      ...(color ? { color } : {}),
    });
    assertCurrent();
  }
}
