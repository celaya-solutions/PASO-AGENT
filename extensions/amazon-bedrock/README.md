# PASO Amazon Bedrock Provider

Official PASO provider plugin for Amazon Bedrock. It adds Bedrock model discovery, text generation, embeddings, and guardrail-aware provider routing for agents that use AWS-hosted models.

Install from PASO:

```bash
openclaw plugins install @openclaw/amazon-bedrock-provider
```

Configure AWS credentials and region through your normal PASO credential/profile setup, then select Bedrock models with the `amazon-bedrock/...` provider prefix.
