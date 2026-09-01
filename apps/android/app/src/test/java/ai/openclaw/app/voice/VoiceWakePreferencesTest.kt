package ai.openclaw.app.voice

import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Test

class VoiceWakePreferencesTest {
  @Test
  fun sanitizeTrimsDropsEmptyAndUsesDefaults() {
    assertEquals(listOf("hello", "computer"), VoiceWakePreferences.sanitizeTriggerWords(listOf(" hello ", "", "computer")))
    assertEquals(VoiceWakePreferences.defaultTriggerWords, VoiceWakePreferences.sanitizeTriggerWords(emptyList()))
  }

  @Test
  fun sanitizePreservesPhrasePunctuationAndNewlines() {
    assertEquals(
      listOf("hey, paso", "line\nbreak"),
      VoiceWakePreferences.sanitizeTriggerWords(listOf(" hey, paso ", "line\nbreak")),
    )
  }

  @Test
  fun matcherRequiresWordBoundariesAndCommand() {
    assertNull(VoiceWakePhraseMatcher.match("repaso show status", listOf("paso")))
    assertNull(VoiceWakePhraseMatcher.match("paso", listOf("paso")))
    assertNull(VoiceWakePhraseMatcher.match("tell paso show status", listOf("paso")))
    assertEquals(
      VoiceWakeMatch(trigger = "PASO", command = "show status"),
      VoiceWakePhraseMatcher.match("Hey PASO, show status", listOf("paso")),
    )
  }

  @Test
  fun matcherUsesEarliestTrigger() {
    assertEquals(
      VoiceWakeMatch(trigger = "computer", command = "ask paso for status"),
      VoiceWakePhraseMatcher.match("computer ask paso for status", listOf("paso", "computer")),
    )
  }

  @Test
  fun matcherSupportsScriptsWithoutWhitespaceWordBoundaries() {
    assertEquals(
      VoiceWakeMatch(trigger = "助手", command = "天气怎么样"),
      VoiceWakePhraseMatcher.match("助手天气怎么样", listOf("助手")),
    )
    assertEquals(
      VoiceWakeMatch(trigger = "ผู้ช่วย", command = "สภาพอากาศ"),
      VoiceWakePhraseMatcher.match("ผู้ช่วยสภาพอากาศ", listOf("ผู้ช่วย")),
    )
  }

  @Test
  fun matcherNormalizesSpokenPunctuationAndWhitespace() {
    assertEquals(
      VoiceWakeMatch(trigger = "Hey PASO", command = "show status"),
      VoiceWakePhraseMatcher.match("Hey PASO show status", listOf("hey,\npaso")),
    )
  }
}
